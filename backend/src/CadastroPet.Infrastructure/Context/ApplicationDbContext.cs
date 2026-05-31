using CadastroPet.Domain.Entities;
using CadastroPet.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace CadastroPet.Infrastructure.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Pet> Pets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Pet>(builder =>
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.OwnerName)
                .HasMaxLength(255)
                .IsRequired();

            builder.Property(x => x.BirthDate)
                .IsRequired();

            builder.Property(x => x.Weight)
                .HasColumnType("decimal(5,3)")
                .IsRequired();

            builder.Property(x => x.Specie)
                .HasConversion(
                    v => v.ToString(),
                    v => (Specie)Enum.Parse(typeof(Specie), v)
                )
                .HasMaxLength(15)
                .IsRequired();
            builder.Property(x => x.Sex)
                .HasConversion(
                    v => v.ToString(),
                    v => (Sex)Enum.Parse(typeof(Sex), v)
                )
                .HasMaxLength(6)
                .IsRequired();

            builder.Property(x => x.Coat)
                .HasMaxLength(255)
                .IsRequired();

            builder.Property(x => x.Vaccinated)
                .IsRequired();

            builder.Property(x => x.OwnerPhone)
                .HasMaxLength(11)
                .IsRequired();
        });

        base.OnModelCreating(modelBuilder);
    }
}