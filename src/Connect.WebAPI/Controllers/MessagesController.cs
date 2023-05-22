using Connect.Application.Models;
using Connect.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Connect.WebAPI.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MessagesController : ControllerBase
{
    private readonly IMessagesService _messagesService;

    public MessagesController(IMessagesService messagesService)
    {
        _messagesService = messagesService;
    }

    // GET: api/Messages
    [Authorize(Policy = "AdminOnly")]
    [HttpGet]
    public async Task<IActionResult> GetMessages()
    {
        var result = await _messagesService.GetMessages();
        return result.Match<IActionResult>(
            value => Ok(value),
            e => BadRequest(e.Message)
        );
    }

    // GET: api/Messages/2
    [Authorize(Policy = "AdminOnly")]
    [HttpGet("{id}")]
    public async Task<ActionResult<MessageResponse>> GetMessage([FromRoute] int id)
    {
        var result = await _messagesService.GetMessage(id);
        return result.Match<ActionResult<MessageResponse>>(
            value => Ok(value),
            _ => NotFound()
        );
    }

    // POST: api/Messages
    [HttpPost]
    public async Task<IActionResult> PostMessage([FromBody] MessagePost request)
    {
        var result = await _messagesService.PostMessage(request, User.Claims);
        return result.Match<IActionResult>(
            value => CreatedAtAction(nameof(GetMessage), new { id = value.Id }, value),
            e => BadRequest(e.Message)
        );
    }

    // DELETE: api/Messages/2
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMessage([FromRoute] int id)
    {
        var result = await _messagesService.DeleteMessage(id, User.Claims);
        return result.Match<IActionResult>(
            _ => Ok(),
            e => BadRequest(e.Message)
        );
    }
}
