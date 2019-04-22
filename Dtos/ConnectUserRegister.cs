using Connect.Models;
using System.ComponentModel.DataAnnotations;

namespace Connect.Dtos
{
    public class ConnectUserRegister
    {
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string LastName { get; set; }

        [Required]
        [Range(10000, 99999)]
        public int NInscription { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 4)]
        public string Password { get; set; }

        [Required]
        [Range(0, 2)]
        public Roles Role { get; set; }
    }
}
