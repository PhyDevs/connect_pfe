using Connect.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Data.Repositories
{
    public class ConnectUserRepository : AbstractRepository<ConnectUser>
    {
        public ConnectUserRepository(ConnectContext context) : base(context) { }

        public async Task<ConnectUser> FindByIndexAsync(int nInscription)
        {
            return await _context.Users.FirstOrDefaultAsync(cu => cu.NInscription == nInscription);
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
}
