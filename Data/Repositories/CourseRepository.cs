using Connect.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Data.Repositories
{
    public class CourseRepository : AbstractRepository<Course>
    {
        public CourseRepository(ConnectContext context) : base(context) { }

        public async Task<Course> GetEagerAsync(int id)
        {
            return await _context.Courses
                .Where(c => c.Id == id)
                .Include(c => c.Teacher)
                .FirstOrDefaultAsync();
        }
    }
}
