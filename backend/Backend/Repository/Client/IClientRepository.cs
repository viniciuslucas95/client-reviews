using Backend.DTO;
using Backend.DTO.Client;

namespace Backend.Repository.Client;

public interface IClientRepository
{
    public Task<int> CreateAsync(string name, string contactName, DateTime date, string? cnpj);
    public Task UpdateAsync(int id, string name, string contactName, DateTime date, string? cnpj);
    public Task DeleteAsync(int id);
    public Task<bool> DoesExistAsync(int id);
    public Task<bool> IsCnpjAlreadyRegisteredAsync(string cnpj, int? excludeId = null);
    public Task<PaginatedDto<PaginatedClientDto>> GetPaginatedAsync(int offset = 0);
    public Task<GetClientDto?> GetAsync(int id);
}
