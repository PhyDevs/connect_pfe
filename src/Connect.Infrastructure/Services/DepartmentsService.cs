using AutoMapper;
using Connect.Application.Enums;
using Connect.Application.Interfaces;
using Connect.Application.Models;
using Connect.Application.Services;
using Connect.Domain.Entities;


namespace Connect.Infrastructure.Services;

public class DepartmentsService : IDepartmentsService
{
    private readonly IEntityManager _em;
    private readonly IMapper _mapper;

    public DepartmentsService(IEntityManager entityManager, IMapper mapper)
    {
        _em = entityManager;
        _mapper = mapper;
    }

    public async Task<Result<IEnumerable<DepartmentListResponse>>> GetDepartments()
    {
        IEnumerable<Department> departments = await _em.Departments.GetAllAsync();
        return _mapper.Map<IEnumerable<DepartmentListResponse>>(departments).ToArray();
    }

    public async Task<Result<DepartmentResponse>> GetDepartment(int id)
    {
        Department department = await _em.Departments.GetEagerAsync(id);
        if (department == null)
            return new Exception("Not found");

        return _mapper.Map<DepartmentResponse>(department);
    }

    public async Task<Result<DepartmentListResponse>> PostDepartment(DepartmentPost request)
    {
        Department department = await _em.Departments.FindByIndexAsync(request.Abbr);
        if (department != null)
            return new Exception("This Departemnt exist");

        Department departmentSave = _mapper.Map<Department>(request);
        await _em.Departments.AddAsync(departmentSave);
        await _em.FlushAsync();

        DepartmentListResponse departmentResponse = _mapper.Map<DepartmentListResponse>(departmentSave);
        return departmentResponse;
    }

    public async Task<Result<bool>> PutDepartment(int id, DepartmentPost request)
    {
        Department department = await _em.Departments.GetAsync(id);
        if (department == null)
            return new Exception("Not found");

        if (request.Abbr != null) department.Abbr = request.Abbr;
        if (request.Name != null) department.Name = request.Name;

        if (request.Abbr != null || request.Name != null) await _em.FlushAsync();

        return true;
    }

    public async Task<Result<bool>> DeleteDepartment(int id)
    {
        Department department = await _em.Departments.GetAsync(id);
        if (department == null)
            return new Exception("Not found");

        _em.Departments.Remove(department);
        await _em.FlushAsync();

        return true;
    }

    public async Task<Result<IEnumerable<ConnectUserListResponse>>> GetUsers(int id)
    {
        if (!await _em.Departments.ExisteAsync(id))
            return new Exception("Not found");

        IEnumerable<ConnectUser> users = await _em.Departments.GetUsersAsync(id);
        return _mapper.Map<IEnumerable<ConnectUserListResponse>>(users).ToArray();
    }
}
