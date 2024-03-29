﻿
namespace Connect.Application.Models;

public class MessageResponse
{
    public int Id { get; set; }

    public string Content { get; set; }

    public DateTime DateTime { get; set; }

    public bool IsPinned { get; set; }

    public int CourseId { get; set; }

    public ConnectUserListResponse Author { get; set; }
}
