using recipes_project.Entities;
using recipes_project.Repositories.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace recipes_project.Repositories.Abstract
{
    public interface ICategoryRepository
    {
    Task<Category> Get(int id);
    Task<IEnumerable<Category>> GetAllAsync();
    Task<Category> GetByIdAsync(int id);
    Task AddAsync(Category entity);
    Task UpdateAsync(Category entity);
    Task DeleteAsync(int id);
  }
}
