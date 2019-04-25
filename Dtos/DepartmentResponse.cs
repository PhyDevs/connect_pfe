using System.Collections.Generic;

namespace Connect.Dtos
{
    public class DepartmentResponse
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Abbr { get; set; }

        public ICollection<CourseListResponse> Courses { get; set; }
    }
}
