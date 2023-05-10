using Connect.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Connect.Infrastructure.Persistance.EntityConfigurations;

public class CourseConfiguration : IEntityTypeConfiguration<Course>
{
    public void Configure(EntityTypeBuilder<Course> builder)
    {
        builder.HasKey(c => c.Id);

        builder
            .Property(c => c.Name)
            .HasMaxLength(80)
            .IsRequired();

        builder
            .HasOne(c => c.Teacher)
            .WithMany()
            .HasForeignKey(c => c.TeacherId);

        builder
            .Property(c => c.TeacherId)
            .IsRequired();

        builder
            .Property(c => c.DepartmentId)
            .IsRequired();
    }
}
