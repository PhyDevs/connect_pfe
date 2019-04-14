using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Connect.Data.Repositories
{
    public abstract class AbstractRepository<TEntity> where TEntity : class
    {
        protected readonly ConnectContext _context;

        public AbstractRepository(ConnectContext context)
        {
            _context = context;
        }

        protected async Task<TEntity> GetAsync(ValueType id)
        {
            return await _context.Set<TEntity>().FindAsync(id);
        }

        protected async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _context.Set<TEntity>().AsNoTracking().ToListAsync();
        }

        protected async Task<IEnumerable<TEntity>> Find(Expression<Func<TEntity, bool>> expression)
        {
            return await _context.Set<TEntity>().Where(expression).ToListAsync();
        }

        protected void Add(TEntity entity)
        {
            _context.Set<TEntity>().AddAsync(entity);
        }

        protected void Remove(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
        }
    }
}
