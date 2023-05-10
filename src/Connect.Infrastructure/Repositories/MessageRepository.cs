using Connect.Domain.Entities;
using Connect.Application.Interfaces;
using Connect.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace Connect.Infrastructure.Repositories;

public class MessageRepository : AbstractRepository<Message>, IMessageRepository
{
    public MessageRepository(ConnectContext context) : base(context) { }

    public async Task<Message> GetEagerAsync(int id)
    {
        return await _context.Messages
            .Where(m => m.Id == id)
            .Include(m => m.Author)
            .FirstOrDefaultAsync();
    }
}
