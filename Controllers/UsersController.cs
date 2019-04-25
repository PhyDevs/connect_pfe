using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Connect.Data;
using Connect.Dtos;
using Connect.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Connect.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IEntityManager _em;
        private readonly IMapper _mapper;

        public UsersController(IEntityManager entityManager, IMapper mapper)
        {
            _em = entityManager;
            _mapper = mapper;
        }

        // GET: api/Users
        [Authorize(Policy = "AdminOnly")]
        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            IEnumerable<ConnectUser> users = await _em.Users.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<ConnectUserResponse>>(users));
        }

        // GET: api/Users/293b3db7-7dea-4270-ba70-08d6c818495a
        [HttpGet("{id}")]
        public async Task<ActionResult<ConnectUserResponse>> GetUser([FromRoute] Guid id)
        {
            ConnectUser user = await _em.Users.GetAsync(id);
            if (user == null) return NotFound();
            
            return _mapper.Map<ConnectUserResponse>(user);
        }

        // GET: api/Users/2
        [HttpGet("{iNumber:int}")]
        public async Task<ActionResult<ConnectUserResponse>> GetUser([FromRoute] int iNumber)
        {
            ConnectUser user = await _em.Users.FindByIndexAsync(iNumber);
            if (user == null) return NotFound();

            return _mapper.Map<ConnectUserResponse>(user);
        }

        // PUT: api/Users/2
        [HttpPut("{iNumber}")]
        public async Task<IActionResult> PutUser([FromRoute] int iNumber, [FromBody] ConnectUserUpdate request)
        {
            int.TryParse(
                User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
                out int nameId);

            if (nameId == 0 || nameId != iNumber) return Forbid();

            ConnectUser user = await _em.Users.FindByIndexAsync(iNumber);
            if (user == null) return NotFound();

            if (request.FirstName != null) user.FirstName = request.FirstName;
            if (request.LastName != null) user.LastName = request.LastName;

            await _em.FlushAsync();
            ConnectUserResponse userResponse = _mapper.Map<ConnectUserResponse>(user);

            return Ok();
        }

        // DELETE: api/Users/2
        [Authorize(Policy = "AdminOnly")]
        [HttpDelete("{iNumber}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int iNumber)
        {
            ConnectUser user = await _em.Users.FindByIndexAsync(iNumber);
            if (user == null) return NotFound();

            _em.Users.Remove(user);
            await _em.FlushAsync();

            return Ok();
        }

    }
}