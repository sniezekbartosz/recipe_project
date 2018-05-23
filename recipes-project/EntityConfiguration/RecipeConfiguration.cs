using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using recipes_project.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace recipes_project.EntityConfiguration
{
  public class RecipeConfiguration : IEntityTypeConfiguration<Recipe>
  {
    public void Configure(EntityTypeBuilder<Recipe> builder)
    {
      builder.Property(r => r.Title)
        .IsRequired()
        .HasMaxLength(100);

      builder.Property(r => r.Description)
        .IsRequired()
        .HasMaxLength(2500);

      builder.Property(r => r.CategoryId)
        .IsRequired();

      builder.Property(r => r.Author)
        .IsRequired();

    }
  }
}
