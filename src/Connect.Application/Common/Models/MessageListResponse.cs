
namespace Connect.Application.Models;

public class MessageListResponse
{
    public int Id { get; set; }

    public string Content { get; set; }

    public DateTime DateTime { get; set; }

    public Guid AuthorId { get; set; }

    public int CourseId { get; set; }
}
