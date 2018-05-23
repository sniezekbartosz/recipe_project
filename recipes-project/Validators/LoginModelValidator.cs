using FluentValidation;
using recipes_project.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace recipes_project.Validators
{
    public class LoginModelValidator : AbstractValidator<LoginModel>
    {
        public LoginModelValidator()
        {
            RuleFor(lm => lm.Username).NotNull().NotEmpty().Length(6, 30).WithMessage("Login musi zawierać się od 6 do 30 znaków");
            RuleFor(lm => lm.Password).Length(6, 20).NotEmpty();
        }
    }
}
