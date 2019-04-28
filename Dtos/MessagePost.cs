using System.ComponentModel.DataAnnotations;

namespace Connect.Dtos
{
    public class MessagePost
    {
        [Required]
        public string Content { get; set; }
        
        public bool IsPinned { get; set; }

        [Required]
        public int? CourseId { get; set; }
    }
}
