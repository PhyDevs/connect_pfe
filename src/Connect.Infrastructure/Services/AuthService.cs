using AutoMapper;
using Connect.Application.Interfaces;
using Connect.Application.Enums;
using Connect.Application.Models;
using Connect.Application.Security;
using Connect.Application.Services;
using Connect.Domain.Entities;


namespace Connect.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly IEntityManager _em;
    private readonly IMapper _mapper;
    private readonly IConnectSecurity _security;

    public AuthService(IEntityManager entityManager, IMapper mapper, IConnectSecurity security)
    {
        _em = entityManager;
        _mapper = mapper;
        _security = security;
    }

    public async Task<Result<(ConnectUserListResponse, string)>> Login(ConnectUserLogin userLogin)
    {
        ConnectUser user = await _em.Users.FindByIndexAsync(userLogin.NInscription);

        if (user == null || !_security.VerifyPassowrd(user, userLogin.Password))
            return new Exception("Bad Credentials");

        ConnectUserListResponse userResponse = _mapper.Map<ConnectUserListResponse>(user);
        string token = _security.GenerateToken(user);

        return (userResponse, token);
    }

    public async Task<Result<(ConnectUserListResponse, string)>> Register(ConnectUserRegister userRegister)
    {
        ConnectUser user = await _em.Users.FindByIndexAsync(userRegister.NInscription);
        if (user != null)
            return new Exception("This user exist.");

        ConnectUser userSave = _mapper.Map<ConnectUser>(userRegister);

        (byte[] hashdrpass, byte[] salt) = _security.HashPassword(userRegister.Password);
        userSave.Password = hashdrpass;
        userSave.Salt = salt;

        await _em.Users.AddAsync(userSave);
        await _em.FlushAsync();

        ConnectUserListResponse userResponse = _mapper.Map<ConnectUserListResponse>(userSave);
        string token = _security.GenerateToken(userSave);

        return (userResponse, token);
    }
}
