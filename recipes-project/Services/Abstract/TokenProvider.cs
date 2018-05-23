using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using recipes_project.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace recipes_project.Services.Abstract
{
    public abstract class TokenProvider
    {
        abstract public Task<object> GenerateJwtToken(string role, IdentityUser user);  
    }
}
