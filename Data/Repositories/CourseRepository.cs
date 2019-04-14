using Connect.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Data.Repositories
{
    public class CourseRepository : AbstractRepository<Course>
    {
        public CourseRepository(ConnectContext context) : base(context) { }
    }
}
