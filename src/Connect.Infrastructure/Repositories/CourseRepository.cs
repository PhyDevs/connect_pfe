using Connect.Domain.Entities;
using Connect.Application.Interfaces;
using Connect.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace Connect.Infrastructure.Repositories;

public class CourseRepository : AbstractRepository<Course>, ICourseRepository
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
