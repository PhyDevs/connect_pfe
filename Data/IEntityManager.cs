using Connect.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect.Data
{
    public interface IEntityManager : IDisposable
    {
        ConnectUserRepository Users { get; }
        CourseRepository Courses { get; }
        DepartmentRepository Departments { get; }
        MessageRepository Messages { get; }

        Task<int> FlushAsync();
    }
}
