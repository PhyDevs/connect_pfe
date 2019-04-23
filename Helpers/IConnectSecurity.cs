using Connect.Models;

namespace Connect.Helpers
{
    public interface IConnectSecurity
    {
        (byte[], byte[]) HashPassword(string password);

        bool VerifyPassowrd(ConnectUser user, string password);

        string GenerateToken(ConnectUser user);
    }
}
