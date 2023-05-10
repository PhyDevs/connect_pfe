using Connect.Application.Interfaces;
using Connect.Infrastructure.Repositories;

namespace Connect.Infrastructure.Persistance;

public class EntityManager : IEntityManager, IDisposable
{
    private readonly ConnectContext _context;

    public EntityManager(ConnectContext context)
    {
        _context = context;
        Users = new ConnectUserRepository(_context);
        Courses = new CourseRepository(_context);
        Departments = new DepartmentRepository(_context);
        Messages = new MessageRepository(_context);
        UserDepartments = new UserDepartmentRepository(_context);
    }

    public IConnectUserRepository Users { get; private set; }
    public ICourseRepository Courses { get; private set; }
    public IDepartmentRepository Departments { get; private set; }
    public IMessageRepository Messages { get; private set; }
    public IUserDepartmentRepository UserDepartments { get; private set; }

    public async Task<int> FlushAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}