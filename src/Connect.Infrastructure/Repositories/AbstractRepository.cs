using Connect.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Connect.Infrastructure.Repositories;

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

    public async Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> expression)
    {
        return await _context.Set<TEntity>().Where(expression).ToListAsync();
    }

    public async Task AddAsync(TEntity entity)
    {
        await _context.Set<TEntity>().AddAsync(entity);
    }

    public void Remove(TEntity entity)
    {
        _context.Set<TEntity>().Remove(entity);
    }

    public async Task<bool> ExisteAsync(ValueType id)
    {
        return await GetAsync(id) == null ? false : true;
    }
}
