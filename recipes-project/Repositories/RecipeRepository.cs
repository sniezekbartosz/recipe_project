using Microsoft.EntityFrameworkCore;
using recipes_project.Data;
using recipes_project.Entities;
using recipes_project.Repositories.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using recipes_project.DTO;
using recipes_project.ViewModels;
using recipes_project.Exceptions;

namespace recipes_project.Repositories
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public RecipeRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IQueryable<Recipe>> Find(System.Linq.Expressions.Expression<Func<Recipe, bool>> predicate)
        {
            return _context.Recipes.Where(predicate);
        }

        public async Task<IEnumerable<Recipe>> GetAllAsync()
        {
            IEnumerable<Recipe> recipes = await _context.Recipes.Include(r => r.Category).ToListAsync();
            return recipes;
        }

        public async Task<Recipe> AddAsync(Recipe entity)
        {
            await _context.Recipes.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(string user, int id)
        {
            var recipe = await _context.Recipes.Include(r => r.Ingredients).Include(r => r.Category).SingleOrDefaultAsync(r => r.RecipeId == id);
            if(recipe == null)
            {
                throw new Exception($"Recipe with id: {id} does not exist");
            }
            if(recipe.Author != user)
            {
                throw new Exception("Unauthorized");
            }
            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();
        }

        public async Task<Recipe> GetByIdAsync(int id)
        {
            var recipe = await _context.Recipes.SingleOrDefaultAsync(r => r.RecipeId == id);
            if(recipe == null)
            {
                throw new Exception($"Recipe with id: {id} does not exist");
            }
            return recipe;
        }

        public async Task<Recipe> UpdateAsync(string user, Recipe entity)
        {
            

            var recipe = await _context.Recipes.Where(r => r.RecipeId == entity.RecipeId).Include(r => r.Ingredients).SingleOrDefaultAsync();
            foreach(var ingredient in recipe.Ingredients) {
                ingredient.RecipeId = recipe.RecipeId;
            }
            if(recipe != null)
            {
                _context.Entry(recipe).CurrentValues.SetValues(entity);

                foreach (var child in recipe.Ingredients.ToArray())
                {
                    if(!entity.Ingredients.Any(i=>i.IngredientId == child.IngredientId))
                    {
                        _context.Ingredients.Remove(child);
                    }
                }
                Ingredient current;
                //Category cat = recipe.Category;
                //if (cat != null && cat.CategoryId == entity.Category.CategoryId)
                //{
                //    _context.Entry(cat).CurrentValues.SetValues(entity.Category);
                //}
                //else
                //{
                //    recipe.Category = entity.Category;
                //}
                
                foreach (var item in entity.Ingredients)
                {
                    current = recipe.Ingredients.Where(i => i.IngredientId == item.IngredientId).SingleOrDefault();

                    if(current != null)
                    {
                        _context.Entry(current).CurrentValues.SetValues(item);
                    }
                    else
                    {
                        recipe.Ingredients.Add(new Ingredient
                        {
                            Name = item.Name,
                            RecipeId = item.RecipeId
                            }
                        );
                    }

                }
                _context.SaveChanges();
                return recipe;

            }
            return null;
            //if(recipe == null)
            //{
            //    throw new Exception($"Recipe with id {entity.RecipeId} does not exist");
            //}
            //if(recipe.Author != user)
            //{
            //    throw new Exception("Unauthorized");
            //}

            //foreach (var item in recipe.Ingredients)
            //{

            //}

            //var ingredients = _context.Recipes
            //    .Include(r => r.Ingredients).Where(r => r.RecipeId == entity.RecipeId).Select(r => r.Ingredients).SingleOrDefault();
            //_context.Ingredients.RemoveRange(ingredients);
            //_context.SaveChanges();

            //_context.Ingredients.AddRange(entity.Ingredients);

            //recipe.Title = entity.Title;
            //recipe.Description = entity.Description;
            ////recipe.CategoryId = entity.CategoryId;
            //recipe.ImgPath = entity.ImgPath;
            //await _context.SaveChangesAsync();

        }

        public async Task<IEnumerable<Recipe>> GetAllRecipesByUserId(string username)
        {
            return await _context.Recipes.Include(r => r.Category).Where(r => r.Author == username).ToListAsync();
        }

        public async Task<Recipe> Get(int id)
        {
            var recipe = await _context.Recipes.Include(r => r.Ingredients).Include(r => r.Category).FirstOrDefaultAsync( r=> r.RecipeId == id);
            if(recipe == null)
            {
                throw new NullResultException();
            }
            return recipe;
        }

        public async Task<EditRecipeViewModel> EditBeta(int? recipeId)
        {
            var editRecipe = new EditRecipeViewModel();
           // editRecipe.Categories = _context.Categories.ToArray();
            if (recipeId != null)
            {
                editRecipe.Recipe = await _context.Recipes.Include(r => r.Ingredients).Include(r => r.Category).SingleOrDefaultAsync(r => r.RecipeId == recipeId);
            }
            return editRecipe;
        }
    }
}
