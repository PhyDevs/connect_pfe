using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Connect.Data;
using Connect.Models;
using Connect.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Connect.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IEntityManager _em;
        private readonly IMapper _mapper;

        public DepartmentsController(IEntityManager entityManager, IMapper mapper)
        {
            _em = entityManager;
            _mapper = mapper;
        }

        // GET: api/Departments
        [Authorize(Policy = "AdminOnly")]
        [HttpGet]
        public async Task<ActionResult> GetDepartments()
        {
            IEnumerable<Department> departments = await _em.Departments.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<DepartmentListResponse>>(departments));
        }

        // GET: api/Departments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentResponse>> GetDepartment([FromRoute] int id)
        {
            Department department = await _em.Departments.GetEagerAsync(id);
            if (department == null) return NotFound();

            return _mapper.Map<DepartmentResponse>(department);
        }

        // POST: api/Departments
        [Authorize(Policy = "AdminOnly")]
        [HttpPost]
        public async Task<IActionResult> PostDepartment([FromBody] DepartmentPost request)
        {
            Department department = await _em.Departments.FindByIndexAsync(request.Abbr);
            if(department != null)
                return BadRequest(new { error = "This Departemnt exist." });

            Department departmentSave = _mapper.Map<Department>(request);
            await _em.Departments.AddAsync(departmentSave);
            await _em.FlushAsync();

            DepartmentListResponse departmentResponse = _mapper.Map<DepartmentListResponse>(departmentSave);
            return CreatedAtAction(nameof(GetDepartment), new { id = departmentSave.Id }, departmentResponse);
        }

        // PUT: api/Departments/5
        [Authorize(Policy = "AdminOnly")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment([FromRoute] int id, [FromBody] DepartmentPost request)
        {
            Department department = await _em.Departments.GetAsync(id);
            if (department == null)
                return NotFound();

            if (request.Abbr != null) department.Abbr = request.Abbr;
            if (request.Name != null) department.Name = request.Name;

            if (request.Abbr != null || request.Name != null) await _em.FlushAsync();

            return Ok();
        }

        // DELETE: api/Departments/5
        [Authorize(Policy = "AdminOnly")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment([FromRoute] int id)
        {
            Department department = await _em.Departments.GetAsync(id);
            if (department == null) return NotFound();

            _em.Departments.Remove(department);
            await _em.FlushAsync();

            return Ok();
        }

        // GET: api/Departments/5/users
        [HttpGet("{id}/users")]
        public async Task<ActionResult> GetUsers([FromRoute] int id)
        {
            if (!await _em.Departments.ExisteAsync(id)) return NotFound();

            IEnumerable<ConnectUser> users = await _em.Departments.GetUsersAsync(id);
            return Ok(_mapper.Map<IEnumerable<ConnectUserListResponse>>(users));
        }
    }
}
