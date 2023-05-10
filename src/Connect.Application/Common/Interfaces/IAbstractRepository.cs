using System.Linq.Expressions;


namespace Connect.Application.Interfaces;

public interface IAbstractRepository<TEntity> where TEntity : class
{
    public Task<TEntity> GetAsync(ValueType id);

    public Task<IEnumerable<TEntity>> GetAllAsync();

    public Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> expression);

    public Task AddAsync(TEntity entity);

    public void Remove(TEntity entity);

    public Task<bool> ExisteAsync(ValueType id);
}
