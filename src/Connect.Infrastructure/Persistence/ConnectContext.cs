using Connect.Domain.Entities;
using Connect.Infrastructure.Persistance.EntityConfigurations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


namespace Connect.Infrastructure.Persistance;

public class ConnectContext : DbContext
{
    public ConnectContext(DbContextOptions<ConnectContext> options, IConfiguration configuration) : base(options) { }

    public DbSet<ConnectUser> Users { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<UserDepartment> UserDepartment { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new ConnectUserConfiguration());
        modelBuilder.ApplyConfiguration(new DepartmentConfiguration());
        modelBuilder.ApplyConfiguration(new UserDepartmentConfiguration());
        modelBuilder.ApplyConfiguration(new CourseConfiguration());
        modelBuilder.ApplyConfiguration(new MessageConfiguration());
    }
}
