using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Models
{
    public class Course
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int TeacherId { get; set; }
        public ConnectUser Teacher { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
