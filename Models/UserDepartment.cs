using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Models
{
    public class UserDepartment
    {
        public int UserId { get; set; }
        public ConnectUser User { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
