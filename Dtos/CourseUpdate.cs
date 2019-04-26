using System.ComponentModel.DataAnnotations;

namespace Connect.Dtos
{
    public class CourseUpdate
    {
        [StringLength(80, MinimumLength = 4)]
        public string Name { get; set; }
    }
}
