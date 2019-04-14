using Connect.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Data.Repositories
{
    public class MessageRepository : AbstractRepository<Message>
    {
        public MessageRepository(ConnectContext context) : base(context) { }
    }
}
