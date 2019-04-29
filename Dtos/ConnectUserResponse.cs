using Newtonsoft.Json;
using System.Collections.Generic;

namespace Connect.Dtos
{
    public class ConnectUserResponse : ConnectUserListResponse
    {
        [JsonProperty(Order = 1)]
        public ICollection<DepartmentListResponse> Departments { get; set; }
    }
}
