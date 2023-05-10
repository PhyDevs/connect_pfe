using Connect.Domain.Entities;


namespace Connect.Application.Interfaces;

public interface IUserDepartmentRepository : IAbstractRepository<UserDepartment>
{
    public Task RemoveAll(Guid id);
}
