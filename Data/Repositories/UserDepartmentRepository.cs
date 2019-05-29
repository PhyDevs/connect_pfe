using Connect.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Data.Repositories
{
    public class UserDepartmentRepository : AbstractRepository<UserDepartment>
    {
        public UserDepartmentRepository(ConnectContext context) : base(context) { }

        public async Task RemoveAll(Guid id)
        {
            List<UserDepartment> departments = await _context.UserDepartment.Where(up => up.UserId == id).ToListAsync();
             _context.UserDepartment.RemoveRange(departments);
        }
    }
}
