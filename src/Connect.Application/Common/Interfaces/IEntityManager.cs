namespace Connect.Application.Interfaces;

public interface IEntityManager : IDisposable
{
    IConnectUserRepository Users { get; }
    ICourseRepository Courses { get; }
    IDepartmentRepository Departments { get; }
    IMessageRepository Messages { get; }
    IUserDepartmentRepository UserDepartments { get; }

    Task<int> FlushAsync();
}
