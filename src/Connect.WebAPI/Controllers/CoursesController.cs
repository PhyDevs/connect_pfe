using Connect.Application.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Connect.Application.Services;


namespace Connect.WebAPI.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CoursesController : ControllerBase
{
    private readonly ICoursesService _coursesService;

    public CoursesController(ICoursesService coursesService)
    {
        _coursesService = coursesService;
    }

    // GET: api/Courses
    [Authorize(Policy = "AdminOnly")]
    [HttpGet]
    public async Task<IActionResult> GetCourses()
    {
        var result = await _coursesService.GetCourses();
        return result.Match<IActionResult>(
            value => Ok(value),
            e => BadRequest(e.Message)
        );
    }

    // GET: api/Courses/2
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCourse([FromRoute] int id)
    {
        var result = await _coursesService.GetCourse(id);
        return result.Match<IActionResult>(
            value => Ok(value),
            _ => NotFound()
        );
    }

    // POST: api/Courses
    [Authorize(Policy = "TeacherOnly")]
    [HttpPost]
    public async Task<IActionResult> PostCourse([FromBody] CoursePost request)
    {
        var result = await _coursesService.PostCourse(request);
        return result.Match<IActionResult>(
            value => CreatedAtAction(nameof(GetCourse), new { id = value.Id }, value),
            e => BadRequest(e.Message)
        );
    }

    // PUT: api/Courses/2
    [Authorize(Policy = "TeacherOnly")]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutCourse([FromRoute] int id, [FromBody] CourseUpdate request)
    {
        var result = await _coursesService.PutCourse(id, request);
        return result.Match<IActionResult>(
            _ => Ok(),
            e => BadRequest(e.Message)
        );
    }

    // DELETE: api/Courses/2
    [Authorize(Policy = "TeacherOnly")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse([FromRoute] int id)
    {
        var result = await _coursesService.DeleteCourse(id);
        return result.Match<IActionResult>(
            _ => Ok(),
            e => BadRequest(e.Message)
        );
    }

    // GET: api/Courses/2/Messages
    [HttpGet("{id}/messages/{offset:int=0}")]
    public async Task<IActionResult> GetMessages([FromRoute] int id, int offset)
    {
        var result = await _coursesService.GetMessages(id, offset);
        return result.Match<IActionResult>(
            value => Ok(value),
            e => BadRequest(e.Message)
        );
    }
}
