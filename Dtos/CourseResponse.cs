using Newtonsoft.Json;

namespace Connect.Dtos
{
    public class CourseResponse : CourseListResponse
    {
        [JsonProperty(Order = 1)]
        public ConnectUserResponse Teacher { get; set; }
    }
}
