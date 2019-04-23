using Connect.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Connect.Helpers
{
    public class ConnectSecurity : IConnectSecurity
    {
        private readonly IConfiguration _configuration;

        public ConnectSecurity(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public (byte[], byte[]) HashPassword(string password)
        {
            if(password == null)
            {
                throw new ArgumentNullException(nameof(password));
            }

            byte[] hashedPassword, salt;

            using (HMACSHA512 hmac = new HMACSHA512())
            {
                salt = hmac.Key;
                hashedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }

            return (hashedPassword, salt);
        }

        public bool VerifyPassowrd(ConnectUser user, string password)
        {
            if (password == null) return false;

            byte[] hashedPassword;
            using (HMACSHA512 hmac = new HMACSHA512(user.Salt))
            {
                hashedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }

            if (!hashedPassword.SequenceEqual(user.Password)) return false;

            return true;
        }

        public string GenerateToken(ConnectUser user)
        {
            Claim[] claims = new[] 
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.NInscription.ToString()),
                new Claim(JwtRegisteredClaimNames.NameId, $"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            string secretKey = _configuration.GetSection("TokenAuthentication:SecretKey").Value;
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            
            SecurityTokenDescriptor tokenDesc = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = new JwtSecurityTokenHandler().CreateToken(tokenDesc);

            return tokenHandler.WriteToken(token);
        }
    }
}
