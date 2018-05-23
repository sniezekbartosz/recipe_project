using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using recipes_project.DTO;
using recipes_project.Entities;
using recipes_project.Repositories.Abstract;
using recipes_project.ViewModels;

namespace recipes_project.Controllers
{
  [Produces("application/json")]
  [Route("api/Recipes")]
  public class RecipesController : Controller
  {
    private readonly IRecipeRepository _recipeRepo;
    private readonly ICategoryRepository _categoryRepo;
    private readonly IMapper _mapper;
    private readonly UserManager<IdentityUser> _userManager;

    public RecipesController(IRecipeRepository _recipeRepo, IMapper mapper, UserManager<IdentityUser> userManager, ICategoryRepository categoryRepo)
    {
      this._recipeRepo = _recipeRepo;
      this._mapper = mapper;
      this._userManager = userManager;
      this._categoryRepo = categoryRepo;
    }


    [Authorize(AuthenticationSchemes = "Bearer")]
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Recipe model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      await _recipeRepo.AddAsync(model);
      return Ok(model.RecipeId);
    }
    [HttpGet]
    public async Task<IActionResult> Get()
    {
      var recipes = await _recipeRepo.GetAllAsync();
      var r2 = _mapper.Map<IEnumerable<RecipeDTO>>(recipes);
      return Ok(recipes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
      var recipe = await _recipeRepo.Get(id);
      var recipeDto = _mapper.Map<RecipeDTO>(recipe);
      return Ok(recipeDto);
    }

    [Authorize(AuthenticationSchemes = "Bearer")]
    [HttpGet("GetAllUserRecipes")]
    public async Task<IActionResult> GetAllUserRecipesAsync()
    {
      var user = HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.Name).Value;
      return Ok(await _recipeRepo.GetAllRecipesByUserId(user));
    }

    [Authorize(AuthenticationSchemes = "Bearer")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRecipe([FromBody] Recipe model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      await _recipeRepo.UpdateAsync(HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.Name).Value, model);
      return Ok();
    }

    [Authorize(AuthenticationSchemes = "Bearer")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      await _recipeRepo.DeleteAsync(HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.Name).Value, id);
      return Ok();
    }

    [HttpGet("EditRecipe/{recipeId?}")]
    public async Task<IActionResult> EditRecipe(int? recipeId = 0)
    {
      var model = new EditRecipeViewModel();
      if (recipeId != 0)
      {
        try
        {
          model.Recipe = await _recipeRepo.Get(recipeId.Value);
          if (model.Recipe.Author != HttpContext.User.FindFirst(System.Security.Claims.ClaimTypes.Name).Value)
          {
            return Unauthorized();
          }
        }
        catch (Exception e)
        {
          return BadRequest(ModelState);
        }
      }
      var categories = await _categoryRepo.GetAllAsync();
      model.Categories = _mapper.Map<IEnumerable<CategoryDTO>>(categories);
      return Ok(model);
    }
  }
}
