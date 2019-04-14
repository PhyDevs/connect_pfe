using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Connect.Data.Repositories;

namespace Connect.Data
{
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
        }

        public ConnectUserRepository Users { get; private set; }
        public CourseRepository Courses { get; private set; }
        public DepartmentRepository Departments { get; private set; }
        public MessageRepository Messages { get; private set; }

        public async Task<int> FlushAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
