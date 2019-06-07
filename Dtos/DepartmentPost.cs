using System.ComponentModel.DataAnnotations;

namespace Connect.Dtos
{
    public class DepartmentPost
    {
        [Required]
        [StringLength(50, MinimumLength = 4)]
        public string Name { get; set; }

        [Required]
        [StringLength(5, MinimumLength = 2)]
        public string Abbr { get; set; }
    }
}
