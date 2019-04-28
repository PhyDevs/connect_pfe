using AutoMapper;
using Connect.Data;
using Connect.Dtos;
using Connect.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Connect.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IEntityManager _em;
        private readonly IMapper _mapper;

        public MessagesController(IEntityManager entityManager, IMapper mapper)
        {
            _em = entityManager;
            _mapper = mapper;
        }

        // GET: api/Messages
        [Authorize(Policy = "AdminOnly")]
        [HttpGet]
        public async Task<ActionResult> GetMessages()
        {
            IEnumerable<Message> messages = await _em.Messages.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<MessageListResponse>>(messages));
        }

        // GET: api/Messages/2
        [Authorize(Policy = "AdminOnly")]
        [HttpGet("{id}")]
        public async Task<ActionResult<MessageResponse>> GetMessage([FromRoute] int id)
        {
            Message message = await _em.Messages.GetEagerAsync(id);
            if (message == null) return NotFound();

            return _mapper.Map<MessageResponse>(message);
        }

        // POST: api/Messages
        [HttpPost]
        public async Task<IActionResult> PostMessage([FromBody] MessagePost request)
        {
            (bool isAllowed, Guid userId) = await AllowedToPostMessageAsync(request);

            if (!isAllowed) return Forbid();

            Message message = _mapper.Map<Message>(request);
            message.AuthorId = userId;
            message.DateTime = DateTime.Now;

            await _em.Messages.AddAsync(message);
            await _em.FlushAsync();

            MessageResponse messageResponse = _mapper.Map<MessageResponse>(message);
            return CreatedAtAction(nameof(GetMessage), new { id = message.Id }, messageResponse);
        }

        // DELETE: api/Messages/2
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage([FromRoute] int id)
        {
            Message message = await _em.Messages.GetAsync(id);
            if (message == null) return NotFound();

            int.TryParse(
                User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
                out int nameId);
            ConnectUser user = await _em.Users.FindByIndexAsync(nameId);

            if (user.Role == Roles.Student && message.AuthorId != user.Id)
                return Forbid();

            _em.Messages.Remove(message);
            await _em.FlushAsync();

            return Ok();
        }

        public async Task<(bool, Guid)> AllowedToPostMessageAsync(MessagePost message)
        {
            Course course = await _em.Courses.GetAsync(message.CourseId);
            if (course == null) return (false, Guid.Empty);

            int.TryParse(
                User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
                out int nameId);
            ConnectUser user = await _em.Users.FindByIndexAsync(nameId);

            if (user == null || (message.IsPinned && user.Role == Roles.Student))
                return (false, Guid.Empty);

            if (await _em.Users.InDepartment(user.Id, course.DepartmentId))
                return (true, user.Id);

            return (false, Guid.Empty);
        }

    }
}
