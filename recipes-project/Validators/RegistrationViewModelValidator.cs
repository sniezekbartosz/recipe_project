using FluentValidation;
using recipes_project.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace recipes_project.Validators
{
    public class RegistrationViewModelValidator : AbstractValidator<RegistrationViewModel>
    {
        public RegistrationViewModelValidator()
        {
            RuleFor(rvm => rvm.Email)
                .NotNull()
                .NotEmpty()
                .EmailAddress()
                .WithMessage("Proszę poodać poprawny adres email");

            RuleFor(rvm => rvm.Username)
                .NotNull()
                .NotEmpty()
                .Length(6, 30)
                .WithMessage("Nazwa użytkownika musi mieścić się w 6 do 30 znaków");
        }
    }
}
