using Connect.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Connect.Infrastructure.Persistance.EntityConfigurations;

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
