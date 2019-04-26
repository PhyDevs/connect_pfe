using System;
using System.Collections.Generic;

namespace Connect.Models
{
    public class Course
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Guid TeacherId { get; set; }
        public ConnectUser Teacher { get; set; }

        public int DepartmentId { get; set; }
        public Department Department { get; set; }

        public List<Message> Messages { get; set; }
    }
}
