using Connect.Application.Interfaces;
using Connect.Infrastructure.Repositories;

namespace Connect.Infrastructure.Persistance;

public class EntityManager : IEntityManager, IDisposable
{
    private readonly ConnectContext _context;
    private IConnectUserRepository _users;
    private ICourseRepository _courses;
    private IDepartmentRepository _departments;
    private IMessageRepository _messages;
    private IUserDepartmentRepository _userDepartments;

    public EntityManager(ConnectContext context)
    {
        _context = context;
    }

    public IConnectUserRepository Users
    {
        get
        {
            if (_users == null) _users = new ConnectUserRepository(_context);
            return _users;
        }
        private set { _users = value; }
    }

    public ICourseRepository Courses
    {
        get
        {
            if (_courses == null) _courses = new CourseRepository(_context);
            return _courses;
        }
        private set { _courses = value; }
    }
    
    public IDepartmentRepository Departments
    {
        get
        {
            if (_departments == null) _departments = new DepartmentRepository(_context);
            return _departments;
        }
        private set { _departments = value; }
    }

    public IMessageRepository Messages
    {
        get
        {
            if (_messages == null) _messages = new MessageRepository(_context);
            return _messages;
        }
        private set { _messages = value; }
    }

    public IUserDepartmentRepository UserDepartments
    {
        get
        {
            if (_userDepartments == null) _userDepartments = new UserDepartmentRepository(_context);
            return _userDepartments;
        }
        private set { _userDepartments = value; }
    }

    public async Task<int> FlushAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}