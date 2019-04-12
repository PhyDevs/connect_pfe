using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Models
{
    public class Message
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public DateTime DateTime { get; set; }

        public bool IsPinned { get; set; }

        public int AuthorId { get; set; }
        public ConnectUser Author { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
