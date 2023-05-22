using System.Security.Claims;
using Connect.Application.Enums;
using Connect.Application.Models;


namespace Connect.Application.Services;

public interface IMessagesService
{
    public Task<Result<IEnumerable<MessageListResponse>>> GetMessages();
    
    public Task<Result<MessageResponse>> GetMessage(int id);

    public Task<Result<MessageResponse>> PostMessage(MessagePost message, IEnumerable<Claim> claims);
    
    public Task<Result<bool>> DeleteMessage(int id, IEnumerable<Claim> claims);
}
