using System.Security.Claims;
using System.Text;
using Connect.Application;
using Connect.Domain.Enums;
using Connect.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;


public static class StartupConfigureServices
{
    // Add services to the container.
    public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddControllers();

        builder.Services.AddApplication();
        builder.Services.AddInfrastructure(builder.Configuration);


        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(builder.Configuration.GetSection("TokenAuthentication:SecretKey").Value))
                };
            });

        builder.Services.AddAuthorization(opt =>
        {
            opt.AddPolicy("AdminOnly",
                policy => policy.RequireClaim(ClaimTypes.Role, Roles.Admin.ToString()));

            opt.AddPolicy("TeacherOnly",
                policy => policy.RequireClaim(ClaimTypes.Role, new string[] {
                    Roles.Admin.ToString(), Roles.Teacher.ToString() }));
        });

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        return builder;
    }
}
