using Connect.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Data.Repositories
{
    public class MessageRepository : AbstractRepository<Message>
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
}
