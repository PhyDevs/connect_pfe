using Connect.Domain.Entities;


namespace Connect.Application.Security;

public interface IConnectSecurity
{
    (byte[], byte[]) HashPassword(string password);

    bool VerifyPassowrd(ConnectUser user, string password);

    string GenerateToken(ConnectUser user);
}
