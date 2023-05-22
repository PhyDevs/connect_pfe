using Connect.Application.Models;
using Connect.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Connect.WebAPI.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUsersService _usersService;

    public UsersController(IUsersService usersService)
    {
        _usersService = usersService;
    }

    // GET: api/Users
    [Authorize(Policy = "AdminOnly")]
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var result = await _usersService.GetUsers();
        return result.Match<IActionResult>(
            value => Ok(value),
            e => BadRequest(e.Message)
        );
    }

    // GET: api/Users/293b3db7-7dea-4270-ba70-08d6c818495a
    [HttpGet("{id}")]
    public async Task<ActionResult<ConnectUserResponse>> GetUser([FromRoute] Guid id)
    {
        var result = await _usersService.GetUser(id);
        return result.Match<ActionResult<ConnectUserResponse>>(
            value => Ok(value),
            _ => NotFound()
        );
    }

    // GET: api/Users/2
    [HttpGet("{iNumber:int}")]
    public async Task<ActionResult<ConnectUserResponse>> GetUser([FromRoute] int iNumber)
    {
        var result = await _usersService.GetUser(iNumber);
        return result.Match<ActionResult<ConnectUserResponse>>(
            value => Ok(value),
            _ => NotFound()
        );
    }

    // PUT: api/Users/2
    [HttpPut("{iNumber}")]
    public async Task<IActionResult> PutUser([FromRoute] int iNumber, [FromBody] ConnectUserUpdate request)
    {
        var result = await _usersService.PutUser(iNumber, request, User.Claims);
        return result.Match<IActionResult>(
            _ => Ok(),
            e => BadRequest(e.Message)
        );
    }

    // DELETE: api/Users/2
    [Authorize(Policy = "AdminOnly")]
    [HttpDelete("{iNumber}")]
    public async Task<IActionResult> DeleteUser([FromRoute] int iNumber)
    {
        var result = await _usersService.DeleteUser(iNumber);
        return result.Match<IActionResult>(
            _ => Ok(),
            _ => NotFound()
        );
    }

    // POST api/Users/2/Departments
    [Authorize(Policy = "AdminOnly")]
    [HttpPost("{iNumber}/Departments")]
    public async Task<IActionResult> AssignDepartmentsToUser([FromRoute] int iNumber, [FromQuery(Name = "role")] int? role, [FromBody] int[] departments)
    {
        var result = await _usersService.AssignDepartmentsToUser(iNumber, role, departments);
        return result.Match<IActionResult>(
            _ => Ok(),
            _ => NotFound()
        );
    }
}
