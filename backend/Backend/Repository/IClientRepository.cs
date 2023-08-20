namespace Backend.Repository;

public interface IClientRepository
{
    public Task<int> CreateAsync(string name, string contactName, DateTime date, string? cnpj);
    public Task UpdateAsync(int id, string name, string contactName, DateTime date, string? cnpj);
    public Task DeleteAsync(int id);
    public Task<bool> DoesExistAsync(int id);
    public Task<bool> IsCnpjAlreadyRegisteredAsync(string cnpj, int? excludeId = null);
}
