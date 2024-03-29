﻿using Connect.Domain.Entities;
using Connect.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Connect.Infrastructure.Persistance.EntityConfigurations;

public class ConnectUserConfiguration : IEntityTypeConfiguration<ConnectUser>
{
    public void Configure(EntityTypeBuilder<ConnectUser> builder)
    {
        builder.HasKey(cu => cu.Id);

        builder
            .Property(cu => cu.FirstName)
            .HasMaxLength(50)
            .IsRequired();

        builder
            .Property(cu => cu.LastName)
            .HasMaxLength(50)
            .IsRequired();

        builder
            .HasIndex(cu => cu.NInscription)
            .IsUnique();
        builder
            .Property(cu => cu.NInscription)
            .IsRequired();

        builder
            .Property(cu => cu.Salt)
            .IsRequired();

        builder
            .Property(cu => cu.Password)
            .IsRequired();

        builder
            .Property(cu => cu.Role)
            .HasConversion<string>()
            .HasDefaultValue(Roles.Student)
            .IsRequired();
    }
}
