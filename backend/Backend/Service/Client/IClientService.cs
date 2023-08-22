using Backend.DTO;
using Backend.DTO.Client;

namespace Backend.Service.Client;

public interface IClientService
{
    public Task<int> CreateAsync(string name, string contactName, DateTime date, string? cnpj);
    public Task UpdateAsync(int id, string name, string contactName, DateTime date, string? cnpj);
    public Task DeleteAsync(int id);
    public Task<PaginatedDto<PaginatedClientDto>> GetPaginatedAsync(int offset = 0, string? name = null);
    public Task<PaginatedDto<PaginatedClientReviewCreationDto>> GetPaginatedForReviewCreationAsync(int offset = 0, string? name = null);
    public Task<bool> IsCnpjAlreadyRegisteredAsync(string cnpj);
    public Task<GetClientDto?> GetAsync(int id);
}
