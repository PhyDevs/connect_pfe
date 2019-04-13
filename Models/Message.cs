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

        public Guid AuthorId { get; set; }
        public ConnectUser Author { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }
    }
}
