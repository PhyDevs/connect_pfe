using Connect.Data.EntityConfigurations;
using Connect.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Data
{
    public class ConnectContext : DbContext
    {
        public ConnectContext(DbContextOptions<ConnectContext> options) : base(options) { }

        DbSet<ConnectUser> Users { get; set; }
        DbSet<Department> Departments { get; set; }
        DbSet<Course> Courses { get; set; }
        DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ConnectUserConfiguration());
            modelBuilder.ApplyConfiguration(new DepartmentConfiguration());
            modelBuilder.ApplyConfiguration(new UserDepartmentConfiguration());
            modelBuilder.ApplyConfiguration(new CourseConfiguration());
            modelBuilder.ApplyConfiguration(new MessageConfiguration());
        }
    }
}
