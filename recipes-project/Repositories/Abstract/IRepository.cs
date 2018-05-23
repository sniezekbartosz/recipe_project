using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace recipes_project.Repositories.Abstract
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<IQueryable<TEntity>> Find(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> Get(int id);
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity> GetByIdAsync(int id);
        Task AddAsync(TEntity entity);
        Task UpdateAsync(string user, TEntity entity);
        Task DeleteAsync(string user, int id);
    }
}
