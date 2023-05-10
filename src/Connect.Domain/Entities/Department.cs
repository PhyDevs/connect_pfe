using System.Collections.Generic;

namespace Connect.Domain.Entities;
public class Department
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string Abbr { get; set; }

    public ICollection<UserDepartment> Users { get; set; }

    public ICollection<Course> Courses { get; set; }
}
