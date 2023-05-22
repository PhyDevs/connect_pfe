using System.Security.Claims;
using Connect.Application.Enums;
using Connect.Application.Models;


namespace Connect.Application.Services;

public interface IUsersService
{
    public Task<Result<IEnumerable<ConnectUserListResponse>>> GetUsers();

    public Task<Result<ConnectUserResponse>> GetUser(Guid id);
    
    public Task<Result<ConnectUserResponse>> GetUser(int iNumber);
    
    public Task<Result<bool>> PutUser(int iNumber, ConnectUserUpdate user, IEnumerable<Claim> claims);
    
    public Task<Result<bool>> DeleteUser(int iNumber);

    public Task<Result<bool>> AssignDepartmentsToUser(int iNumber, int? role, int[] departments);
}
