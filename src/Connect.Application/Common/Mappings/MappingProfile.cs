using AutoMapper;
using Connect.Application.Models;
using Connect.Domain.Entities;

namespace Connect.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<ConnectUser, ConnectUserListResponse>()
            .ForMember(dest => dest.FullName, opt =>
            {
                opt.MapFrom(src => $"{src.FirstName} {src.LastName}");
            })
            .ForMember(dest => dest.Role, opt => opt.MapFrom(
                src => src.Role.ToString().ToLower())
            );
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
        CreateMap<Course, CourseResponse>();
        CreateMap<CoursePost, Course>();

        CreateMap<Message, MessageListResponse>();
        CreateMap<Message, MessageResponse>();
        CreateMap<MessagePost, Message>();

        CreateMap<UserDepartment, DepartmentListResponse>()
            .ForMember(dest => dest.Id, opt => { opt.MapFrom(src => src.DepartmentId); })
            .ForMember(dest => dest.Name, opt => { opt.MapFrom(src => src.Department.Name); })
            .ForMember(dest => dest.Abbr, opt => { opt.MapFrom(src => src.Department.Abbr); });
    }
}
