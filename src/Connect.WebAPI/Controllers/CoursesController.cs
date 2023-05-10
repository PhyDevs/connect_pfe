using AutoMapper;
using Connect.Application.Interfaces;
using Connect.Domain.Entities;
using Connect.Application.Models;
using Connect.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace Connect.WebAPI.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CoursesController : ControllerBase
{
    private readonly IEntityManager _em;
    private readonly IMapper _mapper;

    public CoursesController(IEntityManager entityManager, IMapper mapper)
    {
        _em = entityManager;
        _mapper = mapper;
    }

    // GET: api/Courses
    [Authorize(Policy = "AdminOnly")]
    [HttpGet]
    public async Task<ActionResult> GetCourses()
    {
        IEnumerable<Course> courses = await _em.Courses.GetAllAsync();
        return Ok(_mapper.Map<IEnumerable<CourseListResponse>>(courses));
    }

    // GET: api/Courses/2
    [HttpGet("{id}")]
    public async Task<ActionResult<CourseResponse>> GetCourse([FromRoute] int id)
    {
        Course course = await _em.Courses.GetEagerAsync(id);
        if (course == null) return NotFound();

        return _mapper.Map<CourseResponse>(course);
    }

    // POST: api/Courses
    [Authorize(Policy = "TeacherOnly")]
    [HttpPost]
    public async Task<IActionResult> PostCourse([FromBody] CoursePost request)
    {
        if (!await _em.Departments.ExisteAsync(request.DepartmentId))
            ModelState.AddModelError("DepartmentId", "This Department Doesn't exist");

        ConnectUser teacher = await _em.Users.GetAsync(request.TeacherId);
        if (teacher == null)
            ModelState.AddModelError("TeacherId", "This Teacher Doesn't exist");

        if (teacher != null && teacher.Role != Roles.Teacher)
            ModelState.AddModelError("TeacherId", "This User is not a Teacher");

        if (!ModelState.IsValid) return BadRequest(ModelState);

        Course course = _mapper.Map<Course>(request);

        await _em.Courses.AddAsync(course);
        await _em.FlushAsync();

        CourseResponse courseResponse = _mapper.Map<CourseResponse>(course);
        return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, courseResponse);
    }

    // PUT: api/Courses/2
    [Authorize(Policy = "TeacherOnly")]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCourse([FromRoute] int id, [FromBody] CourseUpdate request)
    {
        Course course = await _em.Courses.GetAsync(id);
        if (course == null) return NotFound();

        if (!await UserHasCourse(course)) return Forbid();

        if (request.Name != null)
        {
            course.Name = request.Name;
            await _em.FlushAsync();
        }

        return Ok();
    }

    // DELETE: api/Courses/2
    [Authorize(Policy = "TeacherOnly")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse([FromRoute] int id)
    {
        Course course = await _em.Courses.GetAsync(id);
        if (course == null) return NotFound();

        if (!await UserHasCourse(course)) return Forbid();

        _em.Courses.Remove(course);
        await _em.FlushAsync();

        return Ok();
    }

    // GET: api/Courses/2/Messages
    [HttpGet("{id}/messages/{offset:int=0}")]
    public async Task<ActionResult> GetMessages([FromRoute] int id, int offset)
    {
        Course course = await _em.Courses.GetAsync(id);
        if (course == null) return NotFound();

        if (!await AllowedToGetMessagesAsync(course)) return Forbid();

        IEnumerable<Message> messages = await _em.Courses.GetMessagesAsync(id, offset, 10);

        return Ok(_mapper.Map<IEnumerable<MessageResponse>>(messages));
    }

    private async Task<bool> UserHasCourse(Course course)
    {
        int.TryParse(
            User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
            out int nameId);
        ConnectUser teacher = await _em.Users.FindByIndexAsync(nameId);

        if (teacher == null || (teacher.Role != Roles.Admin && teacher.Id != course.TeacherId))
            return false;
        else
            return true;
    }

    private async Task<bool> AllowedToGetMessagesAsync(Course course)
    {
        int.TryParse(
            User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
            out int nameId);
        ConnectUser user = await _em.Users.FindByIndexAsync(nameId);

        if (user == null) return false;

        if (await _em.Users.InDepartment(user.Id, course.DepartmentId) || user.Role == Roles.Admin)
            return true;

        return false;
    }

}
