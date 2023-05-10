using Newtonsoft.Json;


namespace Connect.Application.Models;

public class ConnectUserResponse : ConnectUserListResponse
{
    [JsonProperty(Order = 1)]
    public ICollection<DepartmentListResponse> Departments { get; set; }
}
