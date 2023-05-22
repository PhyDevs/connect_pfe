using AutoMapper;
using Connect.Application.Enums;
using Connect.Application.Interfaces;
using Connect.Application.Models;
using Connect.Application.Services;
using Connect.Domain.Entities;
using Connect.Domain.Enums;
using System.Security.Claims;


namespace Connect.Infrastructure.Services;

public class MessagesService : IMessagesService
{
    private readonly IEntityManager _em;
    private readonly IMapper _mapper;

    public MessagesService(IEntityManager entityManager, IMapper mapper)
    {
        _em = entityManager;
        _mapper = mapper;
    }

    public async Task<Result<IEnumerable<MessageListResponse>>> GetMessages()
    {
        IEnumerable<Message> messages = await _em.Messages.GetAllAsync();
        return _mapper.Map<IEnumerable<MessageListResponse>>(messages).ToArray();
    }

    public async Task<Result<MessageResponse>> GetMessage(int id)
    {
        Message message = await _em.Messages.GetEagerAsync(id);
        if (message == null)
            return new Exception("Not found");

        return _mapper.Map<MessageResponse>(message);
    }

    public async Task<Result<MessageResponse>> PostMessage(MessagePost request, IEnumerable<Claim> claims)
    {
        (bool isAllowed, Guid userId) = await AllowedToPostMessageAsync(request, claims);

        if (!isAllowed)
            return new Exception("Not allowed");

        Message message = _mapper.Map<Message>(request);
        message.AuthorId = userId;
        message.DateTime = DateTime.Now;

        await _em.Messages.AddAsync(message);
        await _em.FlushAsync();

        return _mapper.Map<MessageResponse>(message);
    }

    public async Task<Result<bool>> DeleteMessage(int id, IEnumerable<Claim> claims)
    {
        Message message = await _em.Messages.GetAsync(id);
        if (message == null)
            return new Exception("Not found");

        int.TryParse(
            claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
            out int nameId);
        ConnectUser user = await _em.Users.FindByIndexAsync(nameId);

        if (user.Role == Roles.Student && message.AuthorId != user.Id)
            return new Exception("Not allowed");

        _em.Messages.Remove(message);
        await _em.FlushAsync();

        return true;
    }


    private async Task<(bool, Guid)> AllowedToPostMessageAsync(MessagePost message, IEnumerable<Claim> claims)
    {
        Course course = await _em.Courses.GetAsync(message.CourseId);
        if (course == null) return (false, Guid.Empty);

        int.TryParse(
            claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
            out int nameId);
        ConnectUser user = await _em.Users.FindByIndexAsync(nameId);

        if (user == null || (message.IsPinned && user.Role == Roles.Student))
            return (false, Guid.Empty);

        if (await _em.Users.InDepartment(user.Id, course.DepartmentId))
            return (true, user.Id);

        return (false, Guid.Empty);
    }
}
