using recipes_project.DTO;
using recipes_project.Entities;
using recipes_project.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace recipes_project.Repositories.Abstract
{
    public interface IRecipeRepository : IRepository<Recipe>
    {
        Task<IEnumerable<Recipe>> GetAllRecipesByUserId(string userId);
        Task<EditRecipeViewModel> EditBeta(int? recipeId);
    }
}
