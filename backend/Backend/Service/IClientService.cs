namespace Backend.Service;

public interface IClientService
{
    public Task<int> CreateAsync(string name, string contactName, DateTime date, string? cnpj);
    public Task UpdateAsync(int id, string name, string contactName, DateTime date, string? cnpj);
    public Task DeleteAsync(int id);
}
