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

        public async Task<TEntity> GetAsync(ValueType id)
        {
            return await _context.Set<TEntity>().FindAsync(id);
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _context.Set<TEntity>().AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> Find(Expression<Func<TEntity, bool>> expression)
        {
            return await _context.Set<TEntity>().Where(expression).ToListAsync();
        }

        public void Add(TEntity entity)
        {
            _context.Set<TEntity>().AddAsync(entity);
        }

        public void Remove(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
        }
    }
}
