using Connect.Application.Models;
using Connect.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Connect.WebAPI.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class DepartmentsController : ControllerBase
{
    private readonly IDepartmentsService _departmentsService;

    public DepartmentsController(IDepartmentsService departmentsService)
    {
        _departmentsService = departmentsService;
    }

    // GET: api/Departments
    [Authorize(Policy = "AdminOnly")]
    [HttpGet]
    public async Task<IActionResult> GetDepartments()
    {
        var result = await _departmentsService.GetDepartments();
        return result.Match<IActionResult>(
            value => Ok(value),
            e => BadRequest(e.Message)
        );
    }

    // GET: api/Departments/5
    [HttpGet("{id}")]
    public async Task<ActionResult<DepartmentResponse>> GetDepartment([FromRoute] int id)
    {
        var result = await _departmentsService.GetDepartment(id);
        return result.Match<ActionResult<DepartmentResponse>>(
            value => Ok(value),
            _ => NotFound()
        );
    }

    // POST: api/Departments
    [Authorize(Policy = "AdminOnly")]
    [HttpPost]
    public async Task<IActionResult> PostDepartment([FromBody] DepartmentPost request)
    {
        var result = await _departmentsService.PostDepartment(request);
        return result.Match<IActionResult>(
            value => CreatedAtAction(nameof(GetDepartment), new { id = value.Id }, value),
            e => BadRequest(e.Message)
        );
    }

    // PUT: api/Departments/5
    [Authorize(Policy = "AdminOnly")]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutDepartment([FromRoute] int id, [FromBody] DepartmentPost request)
    {
        var result = await _departmentsService.PutDepartment(id, request);
        return result.Match<IActionResult>(
            _ => Ok(),
            _ => NotFound()
        );
    }

    // DELETE: api/Departments/5
    [Authorize(Policy = "AdminOnly")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDepartment([FromRoute] int id)
    {
        var result = await _departmentsService.DeleteDepartment(id);
        return result.Match<IActionResult>(
            _ => Ok(),
            _ => NotFound()
        );
    }

    // GET: api/Departments/5/users
    [HttpGet("{id}/users")]
    public async Task<IActionResult> GetUsers([FromRoute] int id)
    {
        var result = await _departmentsService.GetUsers(id);
        return result.Match<IActionResult>(
            value => Ok(value),
            _ => NotFound()
        );
    }
}
