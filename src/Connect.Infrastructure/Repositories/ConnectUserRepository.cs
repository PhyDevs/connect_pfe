using Connect.Domain.Entities;
using Connect.Application.Interfaces;
using Connect.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace Connect.Infrastructure.Repositories;

public class ConnectUserRepository : AbstractRepository<ConnectUser>, IConnectUserRepository
{
    public ConnectUserRepository(ConnectContext context) : base(context) { }


    public async Task<IEnumerable<ConnectUser>> GetLatestAsync()
    {
        return await _context.Users.OrderByDescending(u => u.Id).AsNoTracking().ToListAsync();
    }

    public async Task<ConnectUser> FindByIndexAsync(int nInscription)
    {
        return await _context.Users.FirstOrDefaultAsync(cu => cu.NInscription == nInscription);
    }

    public async Task<ConnectUser> GetEagerAsync(Guid id)
    {
        return await _context.Users
            .Where(u => u.Id == id)
            .Include(u => u.Departments)
                .ThenInclude(ud => ud.Department)
            .FirstOrDefaultAsync();
    }

    public async Task<ConnectUser> GetEagerAsync(int iNumber)
    {
        return await _context.Users
            .Where(u => u.NInscription == iNumber)
            .Include(u => u.Departments)
                .ThenInclude(ud => ud.Department)
            .FirstOrDefaultAsync();
    }

    public async Task<bool> InDepartment(Guid id, int departmentId)
    {
        ConnectUser user = await _context.Users
            .Where(u => u.Id == id)
            .Include(u => u.Departments)
            .FirstOrDefaultAsync(u => u.Departments.Any(d => d.DepartmentId == departmentId));

        return user != null ? true : false;
    }
}
