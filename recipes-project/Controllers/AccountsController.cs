using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using recipes_project.Data;
using recipes_project.ViewModels;

namespace recipes_project.Controllers
{
    [Produces("application/json")]
    [Route("api/Accounts")]
    public class AccountsController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManger;

        public AccountsController(UserManager<IdentityUser> userManager, ApplicationDbContext appDbContext, RoleManager<IdentityRole> roleManger)
        {
            _userManager = userManager;
            _appDbContext = appDbContext;
            _roleManger = roleManger;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if(!await _roleManger.RoleExistsAsync("user"))
            {
                var role = new IdentityRole();
                role.Name = "user";
                await _roleManger.CreateAsync(role);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new IdentityUser { UserName = model.Username, Email = model.Email };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded) return BadRequest();

            await _userManager.AddToRoleAsync(user, "user");

            return new OkObjectResult("Account created");
        }
    }
}