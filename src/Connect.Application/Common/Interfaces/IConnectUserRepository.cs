using Connect.Domain.Entities;


namespace Connect.Application.Interfaces;

public interface IConnectUserRepository: IAbstractRepository<ConnectUser>
{
    public Task<IEnumerable<ConnectUser>> GetLatestAsync();

    public Task<ConnectUser> FindByIndexAsync(int nInscription);

    public Task<ConnectUser> GetEagerAsync(Guid id);

    public Task<ConnectUser> GetEagerAsync(int iNumber);

    public Task<bool> InDepartment(Guid id, int departmentId);
}
