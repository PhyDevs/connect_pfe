using System.Threading.Tasks;
using AutoMapper;
using Connect.Data;
using Connect.Dtos;
using Connect.Helpers;
using Connect.Models;
using Microsoft.AspNetCore.Mvc;

namespace Connect.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IEntityManager _em;
        private readonly IMapper _mapper;
        private readonly IConnectSecurity _security;

        public AuthController(IEntityManager entityManager, IMapper mapper, IConnectSecurity security)
        {
            _em = entityManager;
            _mapper = mapper;
            _security = security;
        }

        // POST: api/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] ConnectUserLogin request)
        {
            ConnectUser user = await _em.Users.FindByIndexAsync(request.NInscription);

            if (user == null || !_security.VerifyPassowrd(user, request.Password))
                return BadRequest(new { error = "Bad Credentials" });

            string token = _security.GenerateToken(user);
            return Ok(new { token });
        }

        // POST: api/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] ConnectUserRegister request)
        {
            if (User.Identity.IsAuthenticated) return Forbid();

            ConnectUser user = await _em.Users.FindByIndexAsync(request.NInscription);
            if (user != null)
                return BadRequest(new { error = "This user exist."});

            ConnectUser userSave = _mapper.Map<ConnectUser>(request);

            (byte[] hashdrpass, byte[] salt) = _security.HashPassword(request.Password);
            userSave.Password = hashdrpass;
            userSave.Salt = salt;

            await _em.Users.AddAsync(userSave);
            await _em.FlushAsync();

            ConnectUserResponse userResponse = _mapper.Map<ConnectUserResponse>(userSave);

            return CreatedAtAction("GetUser", "Users", new { id = userSave.Id }, userResponse);
        }
    }
}