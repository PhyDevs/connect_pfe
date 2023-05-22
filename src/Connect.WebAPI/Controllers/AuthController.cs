using Connect.Application.Models;
using Connect.Application.Services;
using Microsoft.AspNetCore.Mvc;


namespace Connect.WebAPI.Controllers;

[ApiController]
[Route("api")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth;

    public AuthController(IAuthService auth)
    {
        _auth = auth;
    }

    // POST: api/login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] ConnectUserLogin request)
    {
        var result = await _auth.Login(request);
        return result.Match<IActionResult>(
            value => Ok(new { user = value.Item1, token = value.Item2 }),
            _ => BadRequest(new { error = "Bad Credentials" })
        );
    }

    // POST: api/register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] ConnectUserRegister request)
    {
        if (User.Identity == null || User.Identity.IsAuthenticated) return Forbid();

        var result = await _auth.Register(request);
        return result.Match<IActionResult>(
            value => CreatedAtAction("GetUser", "Users", new { id = value.Item1.Id }, new { user = value.Item1, token = value.Item2 }),
            e => BadRequest(new { error = e.Message })
        );
    }
}
