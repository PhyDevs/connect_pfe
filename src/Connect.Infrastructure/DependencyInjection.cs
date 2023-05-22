using Connect.Application.Interfaces;
using Connect.Application.Security;
using Connect.Application.Services;
using Connect.Infrastructure.Persistance;
using Connect.Infrastructure.Security;
using Connect.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace Connect.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ConnectContext>(opt =>
            opt.UseSqlServer(configuration.GetConnectionString("ConnectPfe"),
                builder => builder.MigrationsAssembly(typeof(ConnectContext).Assembly.FullName))
        );

        services.AddScoped<ConnectContextInitialiser>();

        services.AddScoped<IEntityManager, EntityManager>();
        services.AddSingleton<IConnectSecurity, ConnectSecurity>();

        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IUsersService, UsersService>();
        services.AddScoped<IDepartmentsService, DepartmentsService>();
        services.AddScoped<ICoursesService, CoursesService>();
        services.AddScoped<IMessagesService, MessagesService>();

        return services;
    }
}
