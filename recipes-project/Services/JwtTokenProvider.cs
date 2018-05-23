using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using recipes_project.ViewModels;

namespace recipes_project.Services.Abstract
{
    public class JwtTokenProvider : TokenProvider
    {
        private readonly IConfiguration _config;
        public JwtTokenProvider(IConfiguration config)
        {
            this._config = config;
        }
        public override async Task<object> GenerateJwtToken(string role, IdentityUser user)
        {
            var claims = new[] {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("role", role)
             };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
              issuer:_config["Jwt:Issuer"],
              audience:_config["Jwt:Issuer"],
              claims: claims,
              expires: DateTime.Now.AddMinutes(1440),
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
