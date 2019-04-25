using AutoMapper;
using Connect.Dtos;
using Connect.Models;

namespace Connect.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ConnectUser, ConnectUserResponse>()
                .ForMember(dest => dest.FullName, opt =>
                {
                    opt.MapFrom(src => $"{src.FirstName} {src.LastName}");
                })
                .ForMember(dest => dest.Role, opt => opt.MapFrom(
                    src => src.Role.ToString().ToLower())
                );
            CreateMap<ConnectUserRegister, ConnectUser>()
                .ForMember(dest => dest.Password, opt => opt.Ignore());
            CreateMap<ConnectUserLogin, ConnectUser>()
                .ForMember(dest => dest.Password, opt => opt.Ignore());

            CreateMap<Department, DepartmentListResponse>();
            CreateMap<Department, DepartmentResponse>();
            CreateMap<DepartmentPost, Department>();

            CreateMap<Course, CourseListResponse>();
        }
    }
}
