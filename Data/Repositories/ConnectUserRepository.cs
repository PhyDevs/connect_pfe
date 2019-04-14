using Connect.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Data.Repositories
{
    public class ConnectUserRepository : AbstractRepository<ConnectUser>
    {
        public ConnectUserRepository(ConnectContext context) : base(context) { }
    }
}
