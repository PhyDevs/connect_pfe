using Connect.Application.Models;
using Connect.Application.Enums;


namespace Connect.Application.Services;

public interface IAuthService
{
    public Task<Result<(ConnectUserListResponse, string)>> Login(ConnectUserLogin userLogin);

    public Task<Result<(ConnectUserListResponse, string)>> Register(ConnectUserRegister userRegister);
}
