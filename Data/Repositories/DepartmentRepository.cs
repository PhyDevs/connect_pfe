using Connect.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Data.Repositories
{
    public class DepartmentRepository : AbstractRepository<Department>
    {
        public DepartmentRepository(ConnectContext context) : base(context) { }

        public async Task<Department> GetEagerAsync(int id)
        {
            return await _context.Departments
                .Where(dep => dep.Id == id)
                .Include(dep => dep.Courses)
                .FirstOrDefaultAsync();
        }

        public async Task<Department> FindByIndexAsync(string abbr)
        {
            return await _context.Departments.FirstOrDefaultAsync(dep => dep.Abbr == abbr);
        }
    }
}
