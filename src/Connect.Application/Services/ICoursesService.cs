using Connect.Application.Enums;
using Connect.Application.Models;


namespace Connect.Application.Services;

public interface ICoursesService
{
    public Task<Result<IEnumerable<CourseListResponse>>> GetCourses();

    public Task<Result<CourseResponse>> GetCourse(int id);

    public Task<Result<CourseResponse>> PostCourse(CoursePost course);

    public Task<Result<bool>> PutCourse(int id, CourseUpdate course);

    public Task<Result<bool>> DeleteCourse(int id);

    public Task<Result<IEnumerable<MessageResponse>>> GetMessages(int id, int offset);
}
