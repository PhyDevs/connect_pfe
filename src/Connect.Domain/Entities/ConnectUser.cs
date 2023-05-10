using Connect.Domain.Enums;


namespace Connect.Domain.Entities;

public class ConnectUser
{
    public Guid Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public int NInscription { get; set; }

    public byte[] Salt { get; set; }

    public byte[] Password { get; set; }

    public Roles Role { get; set; }

    public List<UserDepartment> Departments { get; set; }
}

