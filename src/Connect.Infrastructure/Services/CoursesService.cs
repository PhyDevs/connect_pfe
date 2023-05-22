using AutoMapper;
using Connect.Application.Interfaces;
using Connect.Domain.Entities;
using Connect.Application.Models;
using Connect.Domain.Enums;
using Connect.Application.Services;
using Connect.Application.Enums;


namespace Connect.Infrastructure.Services;

public class CoursesService : ICoursesService
{
    private readonly IEntityManager _em;
    private readonly IMapper _mapper;

    public CoursesService(IEntityManager entityManager, IMapper mapper)
    {
        _em = entityManager;
        _mapper = mapper;
    }

    public async Task<Result<IEnumerable<CourseListResponse>>> GetCourses()
    {
        IEnumerable<Course> courses = await _em.Courses.GetAllAsync();
        return _mapper.Map<IEnumerable<CourseListResponse>>(courses).ToArray();
    }

    public async Task<Result<CourseResponse>> GetCourse(int id)
    {
        Course course = await _em.Courses.GetEagerAsync(id);
        if (course == null) 
            return new Exception("Not found");

        return _mapper.Map<CourseResponse>(course);
    }

    public async Task<Result<CourseResponse>> PostCourse(CoursePost course)
    {
        if (!await _em.Departments.ExisteAsync(course.DepartmentId))
            return new Exception("DepartmentId: This Department Doesn't exist");

        ConnectUser teacher = await _em.Users.GetAsync(course.TeacherId);
        if (teacher == null)
            return new Exception("TeacherId: This Teacher Doesn't exist");

        if (teacher != null && teacher.Role != Roles.Teacher)
            return new Exception("TeacherId: This User is not a Teacher");

        Course _course = _mapper.Map<Course>(course);

        await _em.Courses.AddAsync(_course);
        await _em.FlushAsync();

        CourseResponse courseResponse = _mapper.Map<CourseResponse>(course);
        return courseResponse;
    }

    public async Task<Result<bool>> PutCourse(int id, CourseUpdate course)
    {
        Course _course = await _em.Courses.GetAsync(id);
        if (course == null) 
            return new Exception("Not found");

        if (!await UserHasCourse(_course)) 
            return new Exception("Not allowed");

        if (course.Name != null)
        {
            _course.Name = course.Name;
            await _em.FlushAsync();
        }

        return true;
    }

    public async Task<Result<bool>> DeleteCourse(int id)
    {
        Course course = await _em.Courses.GetAsync(id);
        if (course == null)
            return new Exception("Not found");

        if (!await UserHasCourse(course))
            return new Exception("Not allowed");

        _em.Courses.Remove(course);
        await _em.FlushAsync();

        return true;
    }

    public async Task<Result<IEnumerable<MessageResponse>>> GetMessages(int id, int offset)
    {
        Course course = await _em.Courses.GetAsync(id);
        if (course == null) 
            return new Exception("Not found");

        if (!await AllowedToGetMessagesAsync(course)) 
            return new Exception("Not allowed");

        IEnumerable<Message> messages = await _em.Courses.GetMessagesAsync(id, offset, 10);

        return _mapper.Map<IEnumerable<MessageResponse>>(messages).ToArray();
    }


    private async Task<bool> UserHasCourse(Course course)
    {
        // int.TryParse(
        //     User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
        //     out int nameId);
        ConnectUser teacher = await _em.Users.FindByIndexAsync(0);

        if (teacher == null || (teacher.Role != Roles.Admin && teacher.Id != course.TeacherId))
            return false;
        else
            return true;
    }

    private async Task<bool> AllowedToGetMessagesAsync(Course course)
    {
        // int.TryParse(
        //     User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
        //     out int nameId);
        // ConnectUser user = await _em.Users.FindByIndexAsync(nameId);
        ConnectUser user = await _em.Users.FindByIndexAsync(0);

        if (user == null) return false;

        if (await _em.Users.InDepartment(user.Id, course.DepartmentId) || user.Role == Roles.Admin)
            return true;

        return false;
    }
}
