using Connect.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Data.EntityConfigurations
{
    public class MessageConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.HasKey(m => m.Id);

            builder
                .Property(m => m.Content)
                .HasColumnType("TEXT")
                .IsRequired();

            builder
                .Property(m => m.DateTime)
                .IsRequired();

            builder
                .Property(m => m.IsPinned)
                .HasDefaultValue(false);

            builder
                .HasOne(m => m.Author)
                .WithMany()
                .HasForeignKey(m => m.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Property(m => m.AuthorId)
                .IsRequired();

            builder
                .HasOne(m => m.Course)
                .WithMany(c => c.Messages)
                .HasForeignKey(m => m.CourseId);

            builder
                .Property(m => m.CourseId)
                .IsRequired();
        }
    }
}
