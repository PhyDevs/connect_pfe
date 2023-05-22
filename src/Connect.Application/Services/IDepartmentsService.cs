using Connect.Application.Enums;
using Connect.Application.Models;


namespace Connect.Application.Services;

public interface IDepartmentsService
{
    public Task<Result<IEnumerable<DepartmentListResponse>>> GetDepartments();

    public Task<Result<DepartmentResponse>> GetDepartment(int id);

    public Task<Result<DepartmentListResponse>> PostDepartment(DepartmentPost department);
    
    public Task<Result<bool>> PutDepartment(int id, DepartmentPost department);

    public Task<Result<bool>> DeleteDepartment(int id);
    
    public Task<Result<IEnumerable<ConnectUserListResponse>>> GetUsers(int id);
}
