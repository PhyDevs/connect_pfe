using Newtonsoft.Json;
using System.Collections.Generic;

namespace Connect.Dtos
{
    public class DepartmentResponse : DepartmentListResponse
    {
        [JsonProperty(Order = 1)]
        public ICollection<CourseListResponse> Courses { get; set; }
    }
}
