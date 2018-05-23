using FluentValidation;
using recipes_project.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace recipes_project.Validators
{
    public class RecipeValidator : AbstractValidator<Recipe>
    {
        public RecipeValidator()
        {
            RuleFor(r => r.Title).NotEmpty().MinimumLength(6).MaximumLength(100).WithMessage("Tytuł musi się mieścić w 6 do 100 znaków");
            RuleFor(r => r.Description).NotEmpty().MaximumLength(2500).WithMessage("Tytuł nie może być pusty");
            RuleFor(r => r.Author).NotEmpty().WithMessage("Wymagany autor");
            RuleFor(r => r.Ingredients).NotNull().WithMessage("Dodaj składniki");
        }
    }
}
