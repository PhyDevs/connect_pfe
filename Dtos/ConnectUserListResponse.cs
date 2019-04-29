using System;

namespace Connect.Dtos
{
    public class ConnectUserListResponse
    {
        public Guid Id { get; set; }

        public string FullName { get; set; }

        public int NInscription { get; set; }

        public string Role { get; set; }
    }
}
