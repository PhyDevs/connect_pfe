using Connect.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Data.EntityConfigurations
{
    public class UserDepartmentConfiguration : IEntityTypeConfiguration<UserDepartment>
    {

        public void Configure(EntityTypeBuilder<UserDepartment> builder)
        {
            builder
                .HasKey(t => new { t.UserId, t.DepartmentId });

            builder
                .HasOne(ud => ud.User)
                .WithMany(ud => ud.Departments)
                .HasForeignKey(ud => ud.UserId);

            builder
                .HasOne(ud => ud.Department)
                .WithMany(d => d.Users)
                .HasForeignKey(ud => ud.DepartmentId);
        }
    }
}
