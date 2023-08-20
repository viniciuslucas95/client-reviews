namespace Backend.Repository;

public interface IClientRepository
{
    public Task<int> CreateAsync(string name, string contactName, DateTime date, string? cnpj);
    public Task<bool> IsCnpjAlreadyRegisteredAsync(string cnpj);
}
