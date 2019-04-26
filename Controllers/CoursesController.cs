using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Connect.Data;
using Connect.Models;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Connect.Dtos;
using System.Security.Claims;

namespace Connect.Controllers
{
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

        private async Task<bool> UserHasCourse(Course course)
        {
            int.TryParse(
                User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
                out int nameId);
            ConnectUser teacher = await _em.Users.FindByIndexAsync(nameId);

            if (teacher == null || (teacher.Role != Roles.Admin && teacher.Id != course.TeacherId))
            {
                return false;
            }
            else
            {
                return true;
            }
        }

    }
}
