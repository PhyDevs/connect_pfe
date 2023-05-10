using System.ComponentModel.DataAnnotations;


namespace Connect.Application.Models;

public class CoursePost
{
    [Required]
    [StringLength(80, MinimumLength = 4)]
    public string Name { get; set; }

    [Required]
    public Guid? TeacherId { get; set; }

    [Required]
    public int? DepartmentId { get; set; }
}
