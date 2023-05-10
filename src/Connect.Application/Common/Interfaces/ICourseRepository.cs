using Connect.Domain.Entities;


namespace Connect.Application.Interfaces;

public interface ICourseRepository: IAbstractRepository<Course>
{
    public Task<Course> GetEagerAsync(int id);

    public Task<IEnumerable<Message>> GetMessagesAsync(int id, int offset = 0, int limit = 10);
}
