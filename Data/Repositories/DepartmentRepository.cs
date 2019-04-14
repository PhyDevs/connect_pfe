using Connect.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Data.Repositories
{
    public class DepartmentRepository : AbstractRepository<Department>
    {
        public DepartmentRepository(ConnectContext context) : base(context) { }
    }
}
