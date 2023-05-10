using Newtonsoft.Json;


namespace Connect.Application.Models;

public class DepartmentResponse : DepartmentListResponse
{
    [JsonProperty(Order = 1)]
    public ICollection<CourseListResponse> Courses { get; set; }
}
