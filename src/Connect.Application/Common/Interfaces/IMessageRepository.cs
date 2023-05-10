using Connect.Domain.Entities;


namespace Connect.Application.Interfaces;

public interface IMessageRepository: IAbstractRepository<Message>
{
    public Task<Message> GetEagerAsync(int id);
}
