using Connect.Application.Interfaces;
using Connect.Domain.Entities;
using Connect.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;


namespace Connect.Infrastructure.Repositories;

public class UserDepartmentRepository : AbstractRepository<UserDepartment>, IUserDepartmentRepository
{
    public UserDepartmentRepository(ConnectContext context) : base(context) { }

    public async Task RemoveAll(Guid id)
    {
        List<UserDepartment> departments = await _context.UserDepartment.Where(up => up.UserId == id).ToListAsync();
        _context.UserDepartment.RemoveRange(departments);
    }
}
