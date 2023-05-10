using Connect.Domain.Entities;


namespace Connect.Application.Interfaces;

public interface IDepartmentRepository: IAbstractRepository<Department>
{
    public Task<Department> GetEagerAsync(int id);

    public Task<Department> FindByIndexAsync(string abbr);

    public Task<IEnumerable<ConnectUser>> GetUsersAsync(int id);
}
