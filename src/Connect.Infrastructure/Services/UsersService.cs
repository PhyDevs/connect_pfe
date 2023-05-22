using System.Security.Claims;
using AutoMapper;
using Connect.Application.Enums;
using Connect.Application.Interfaces;
using Connect.Application.Models;
using Connect.Application.Services;
using Connect.Domain.Entities;
using Connect.Domain.Enums;


namespace Connect.Infrastructure.Services;

public class UsersService : IUsersService
{
    private readonly IEntityManager _em;
    private readonly IMapper _mapper;

    public UsersService(IEntityManager entityManager, IMapper mapper)
    {
        _em = entityManager;
        _mapper = mapper;
    }

    public async Task<Result<IEnumerable<ConnectUserListResponse>>> GetUsers()
    {
        IEnumerable<ConnectUser> users = await _em.Users.GetLatestAsync();
        return _mapper.Map<IEnumerable<ConnectUserListResponse>>(users).ToArray();
    }

    public async Task<Result<ConnectUserResponse>> GetUser(Guid id)
    {
        ConnectUser user = await _em.Users.GetEagerAsync(id);
        if (user == null)
            return new Exception("Not found");

        return _mapper.Map<ConnectUserResponse>(user);
    }

    public async Task<Result<ConnectUserResponse>> GetUser(int iNumber)
    {
        ConnectUser user = await _em.Users.GetEagerAsync(iNumber);
        if (user == null)
            return new Exception("Not found");

        return _mapper.Map<ConnectUserResponse>(user);
    }

    public async Task<Result<bool>> PutUser(int iNumber, ConnectUserUpdate request, IEnumerable<Claim> claims)
    {
        int.TryParse(
            claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
            out int nameId);

        if (nameId == 0 || nameId != iNumber)
            return new Exception("Not allowed");

        ConnectUser user = await _em.Users.FindByIndexAsync(iNumber);
        if (user == null)
            return new Exception("Not found");

        if (request.FirstName != null) user.FirstName = request.FirstName;
        if (request.LastName != null) user.LastName = request.LastName;

        if (request.FirstName != null || request.LastName != null)
            await _em.FlushAsync();

        return true;
    }

    public async Task<Result<bool>> DeleteUser(int iNumber)
    {
        ConnectUser user = await _em.Users.FindByIndexAsync(iNumber);
        if (user == null)
            return new Exception("Not found");

        _em.Users.Remove(user);
        await _em.FlushAsync();

        return true;
    }

    public async Task<Result<bool>> AssignDepartmentsToUser(int iNumber, int? role, int[] departments)
    {
        ConnectUser user = await _em.Users.FindByIndexAsync(iNumber);
        if (user == null)
            return new Exception("Not found");

        if (role >= 0 || role <= 2) user.Role = (Roles)role;

        await _em.UserDepartments.RemoveAll(user.Id);

        foreach (int departemtnId in departments)
        {
            if (!await _em.Departments.ExisteAsync(departemtnId))
                return new Exception("Not found");

            UserDepartment userDepartment = new UserDepartment() { UserId = user.Id, DepartmentId = departemtnId };
            await _em.UserDepartments.AddAsync(userDepartment);
        }

        await _em.FlushAsync();
        
        return true;
    }
}
