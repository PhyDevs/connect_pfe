using Connect.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Data.EntityConfigurations
{
    public class DepartmentConfiguration : IEntityTypeConfiguration<Department>
    {
        public void Configure(EntityTypeBuilder<Department> builder)
        {
            builder.HasKey(d => d.Id);

            builder
                .Property(d => d.Name)
                .HasMaxLength(50)
                .IsRequired();

            builder
                .HasIndex(d => d.Abbr)
                .IsUnique();
            builder
                .Property(d => d.Abbr)
                .HasMaxLength(5)
                .IsRequired();
        }
    }
}
