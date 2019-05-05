using System.Security.Claims;
using System.Text;
using AutoMapper;
using Connect.Data;
using Connect.Helpers;
using Connect.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Connect
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddDbContext<ConnectContext>(opt =>
                opt.UseSqlServer(Configuration.GetConnectionString("ConnectConnectionString"))
            );

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(Configuration.GetSection("TokenAuthentication:SecretKey").Value))
                    };
                });

            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("AdminOnly",
                    policy => policy.RequireClaim(ClaimTypes.Role, Roles.Admin.ToString()));
                opt.AddPolicy("TeacherOnly",
                    policy => policy.RequireClaim(ClaimTypes.Role, new string[] {
                        Roles.Admin.ToString(), Roles.Teacher.ToString() }));

            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddAutoMapper();

            services.AddScoped<IEntityManager, EntityManager>();
            services.AddSingleton<IConnectSecurity, ConnectSecurity>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(builder => builder.WithOrigins("https://localhost:3000")
                                .AllowAnyMethod()
                                .AllowAnyHeader());

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseAuthentication();
            app.UseMvc();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                if(env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("https://localhost:3000");
                }
            });
        }
    }
}
