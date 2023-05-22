using Connect.Application.Security;
using Connect.Domain.Entities;
using Connect.Domain.Enums;
using Microsoft.EntityFrameworkCore;


namespace Connect.Infrastructure.Persistance;

public class ConnectContextInitialiser
{
    private readonly ConnectContext _context;
    private readonly IConnectSecurity _security;

    public ConnectContextInitialiser(ConnectContext context, IConnectSecurity security)
    {
        _context = context;
        _security = security;
    }

    public void Initialise()
    {
        try
        {
            _context.Database.Migrate();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message, " An error occurred while initialising the database.");
        }
    }

    public void Seed()
    {
        try
        {
            _runSeed();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message, " An error occurred while seeding the database.");
        }
    }

    private void _runSeed()
    {
        if (_context.Users.Any())
            return;

        // Add users seed
        var users = new ConnectUser[7];
        (byte[] hashdrpass, byte[] salt) = _security.HashPassword("1234");

        users[0] = new ConnectUser()
        {
            FirstName = "Admin",
            LastName = "A",
            NInscription = 10000,
            Role = Roles.Admin,
            Password = hashdrpass,
            Salt = salt
        };

        for (int i = 1; i < 3; i++)
        {
            users[i] = new ConnectUser()
            {
                FirstName = "Teacher",
                LastName = i.ToString(),
                NInscription = 10000 + i,
                Role = Roles.Teacher,
                Password = hashdrpass,
                Salt = salt
            };
        }

        for (int i = 1; i < 5; i++)
        {
            users[i + 2] = new ConnectUser()
            {
                FirstName = "Student",
                LastName = i.ToString(),
                NInscription = i * 1000 + 10,
                Role = Roles.Student,
                Password = hashdrpass,
                Salt = salt
            };
        }
        _context.Users.AddRange(users);

        // Add departments seed
        var departments = new Department[3];
        departments[0] = new Department()
        {
            Name = "Computer Science",
            Abbr = "CS"
        };
        departments[1] = new Department()
        {
            Name = "Physics Science",
            Abbr = "Phy"
        };
        departments[2] = new Department()
        {
            Name = "Chemistry Science",
            Abbr = "Chm"
        };
        _context.Departments.AddRange(departments);
        _context.SaveChanges();


        // Add Users Departments seed
        var userDepartments = new List<UserDepartment>();
        for (int i = 0; i < departments.Length; i++)
        {
            userDepartments.Add(new UserDepartment()
            {
                UserId = users[0].Id,
                DepartmentId = departments[i].Id
            });

            if (i == 0)
            {
                userDepartments.Add(new UserDepartment()
                {
                    UserId = users[1].Id,
                    DepartmentId = departments[i].Id
                });
            }
            else
            {
                userDepartments.Add(new UserDepartment()
                {
                    UserId = users[2].Id,
                    DepartmentId = departments[i].Id
                });
            }
        }
        for (int i = 3; i < users.Length; i++)
        {
            userDepartments.Add(new UserDepartment()
            {
                UserId = users[i].Id,
                DepartmentId = departments[0].Id
            });
            userDepartments.Add(new UserDepartment()
            {
                UserId = users[i].Id,
                DepartmentId = departments[1].Id
            });
            userDepartments.Add(new UserDepartment()
            {
                UserId = users[i].Id,
                DepartmentId = departments[2].Id
            });
        }
        _context.UserDepartment.AddRange(userDepartments);


        // Add courses seed
        var courses = new Course[6];
        courses[0] = new Course()
        {
            Name = "Rust",
            TeacherId = users[0].Id,
            DepartmentId = departments[0].Id,
        };
        courses[1] = new Course()
        {
            Name = "Java 101",
            TeacherId = users[0].Id,
            DepartmentId = departments[0].Id,
        };
        courses[2] = new Course()
        {
            Name = "Thermodynamics",
            TeacherId = users[1].Id,
            DepartmentId = departments[1].Id,
        };
        courses[3] = new Course()
        {
            Name = "Quantum mechanics",
            TeacherId = users[1].Id,
            DepartmentId = departments[1].Id,
        };
        courses[4] = new Course()
        {
            Name = "General chimie",
            TeacherId = users[1].Id,
            DepartmentId = departments[2].Id,
        };
        courses[5] = new Course()
        {
            Name = "Organic ",
            TeacherId = users[1].Id,
            DepartmentId = departments[2].Id,
        };
        _context.Courses.AddRange(courses);
        
        _context.SaveChanges();
    }
}