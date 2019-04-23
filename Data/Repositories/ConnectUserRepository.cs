using Connect.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Connect.Data.Repositories
{
    public class ConnectUserRepository : AbstractRepository<ConnectUser>
    {
        public ConnectUserRepository(ConnectContext context) : base(context) { }

        public async Task<ConnectUser> FindByKeyAsync(int nInscription)
        {
            return await _context.Users.FirstOrDefaultAsync(cu => cu.NInscription == nInscription);
        }
    }
}
