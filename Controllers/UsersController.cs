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

        [Authorize(Policy = "AdminOnly")]
        [HttpGet]
        public async Task<ActionResult> GetAllAsync()
        {
            IEnumerable<ConnectUser> users = await _em.Users.GetAllAsync();

            return Ok(_mapper.Map<IEnumerable<ConnectUserResponse>>(users));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ConnectUserResponse>> GetAsync(Guid id)
        {
            ConnectUser user = await _em.Users.GetAsync(id);
            if (user == null) return NotFound();
            
            return _mapper.Map<ConnectUserResponse>(user);
        }

        [HttpGet("{iNumber:int}")]
        public async Task<ActionResult<ConnectUserResponse>> GetAsync(int iNumber)
        {
            ConnectUser user = await _em.Users.FindByKeyAsync(iNumber);
            if (user == null) return NotFound();

            return _mapper.Map<ConnectUserResponse>(user);
        }

        [HttpPut("{iNumber}")]
        public async Task<ActionResult> UpdateAsync(int iNumber, [FromBody] ConnectUserUpdate request)
        {
            int.TryParse(
                User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
                out int nameId);

            if (nameId == 0 || nameId != iNumber) return Forbid();

            ConnectUser user = await _em.Users.FindByKeyAsync(iNumber);
            if (user == null) return NotFound();

            if (request.FirstName != null) user.FirstName = request.FirstName;
            if (request.LastName != null) user.LastName = request.LastName;

            await _em.FlushAsync();
            ConnectUserResponse userResponse = _mapper.Map<ConnectUserResponse>(user);

            return CreatedAtAction(nameof(GetAsync), new { id = user.Id }, userResponse);
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpDelete("{iNumber}")]
        public async Task<ActionResult> Delete(int iNumber)
        {
            ConnectUser user = await _em.Users.FindByKeyAsync(iNumber);
            if (user == null) return NotFound();

            _em.Users.Remove(user);
            await _em.FlushAsync();

            return Ok();
        }

    }
}