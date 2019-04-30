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

        public async Task<IEnumerable<Message>> GetMessagesAsync(int id, int offset = 0, int limit = 10)
        {
            return await _context.Messages
                .Where(m => m.CourseId == id)
                .OrderByDescending(m => m.DateTime)
                .Skip(offset)
                .Take(limit)
                .Include(m => m.Author)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
