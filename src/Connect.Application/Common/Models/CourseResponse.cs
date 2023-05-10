using Newtonsoft.Json;


namespace Connect.Application.Models;

public class CourseResponse : CourseListResponse
{
    [JsonProperty(Order = 1)]
    public ConnectUserListResponse Teacher { get; set; }
}
