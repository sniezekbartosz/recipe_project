using recipes_project.Data;
using recipes_project.Entities;
using recipes_project.Exceptions;
using recipes_project.Repositories.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace recipes_project.Repositories
{
  public class CategoryRepository : ICategoryRepository
  {
    private readonly ApplicationDbContext _context;
    public CategoryRepository(ApplicationDbContext context)
    {
      this._context = context;
    }

    public async Task AddAsync(Category entity)
    {
      var category = _context.Categories.SingleOrDefault(c => c.CategoryId == entity.CategoryId);
      if (category == null)
      {
        await _context.Categories.AddAsync(entity);
        await _context.SaveChangesAsync();
      }
      else
      {
        throw new Exception("Kategoria istnieje");
      }
    }

    public async Task DeleteAsync(int id)
    {
      var cat = _context.Categories.SingleOrDefault(c => c.CategoryId == id);
      if (cat == null)
      {
        throw new NullResultException();
      }
      _context.Categories.Remove(cat);
      await _context.SaveChangesAsync();
    }

    public async Task<Category> Get(int id)
    {
      var category = _context.Categories.SingleOrDefault(c => c.CategoryId == id);
      if (category == null)
      {
        throw new NullResultException();
      }
      return category;
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
      return _context.Categories.ToList();
    }

    public async Task<Category> GetByIdAsync(int id)
    {
      var category = _context.Categories.SingleOrDefault(c => c.CategoryId == id);
      if(category == null)
      {
        throw new NullResultException();
      }
      return category;
    }

    public async Task UpdateAsync(Category entity)
    {
      var category = _context.Categories.SingleOrDefault(c => c.CategoryId == entity.CategoryId);
      if (category == null)
      {
        throw new NullResultException();
      }
      category.Name = category.Name;
      await _context.SaveChangesAsync();
    }
  }
}
