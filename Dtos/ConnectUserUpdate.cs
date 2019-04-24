using System.ComponentModel.DataAnnotations;

namespace Connect.Dtos
{
    public class ConnectUserUpdate
    {
        [StringLength(30, MinimumLength = 3)]
        public string FirstName { get; set; }
        
        [StringLength(30, MinimumLength = 3)]
        public string LastName { get; set; }
    }
}
