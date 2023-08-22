using Backend.DTO;
using Backend.DTO.Client;
using Backend.Exception;
using Backend.Repository.Client;
using Backend.Util.Extension;

namespace Backend.Service.Client;

public class ClientService : IClientService
{
    private readonly IClientRepository _repository;

    public ClientService(IClientRepository repository)
    {
        _repository = repository;
    }

    public async Task<int> CreateAsync(string name, string contactName, DateTime date, string? cnpj)
    {
        await ValidatePropsAsync(name, contactName, date, cnpj);

        return await _repository.CreateAsync(name, contactName, date, cnpj);
    }

    public async Task UpdateAsync(int id, string name, string contactName, DateTime date, string? cnpj)
    {
        if (!await _repository.DoesExistAsync(id))
        {
            throw new NotFoundException("Client not found", "Client not found");
        }

        await ValidatePropsAsync(name, contactName, date, cnpj, id);

        await _repository.UpdateAsync(id, name, contactName, date, cnpj);
    }

    public async Task DeleteAsync(int id)
    {
        if (!await _repository.DoesExistAsync(id))
        {
            throw new NotFoundException("Client not found", "Client not found");
        }

        await _repository.DeleteAsync(id);
    }

    public async Task<PaginatedDto<PaginatedClientDto>> GetPaginatedAsync(int offset = 0)
    {
        return await _repository.GetPaginatedAsync(offset);
    }

    public async Task<PaginatedDto<PaginatedClientReviewCreationDto>> GetPaginatedForReviewCreationAsync(int offset = 0)
    {
        return await _repository.GetPaginatedForReviewCreationAsync(offset);
    }

    public async Task<GetClientDto?> GetAsync(int id)
    {
        var result = await _repository.GetAsync(id);

        if (result is null)
        {
            throw new NotFoundException("Client not found", "Client not found");
        }

        return result;
    }

    private async Task ValidatePropsAsync(string name, string contactName, DateTime date, string? cnpj, int? id = null)
    {
        if (!name.HasNonWhitespaceCharacters())
        {
            throw new EmptyStringException("Client name cannot be empty");
        }

        if (!contactName.HasNonWhitespaceCharacters())
        {
            throw new EmptyStringException("Client contact name cannot be empty");
        }

        if (cnpj != null)
        {
            if (!cnpj.HasNonWhitespaceCharacters())
            {
                throw new EmptyStringException("Client cnpj cannot be empty");
            }

            var isCnpjAlreadyRegistered = id is not null ?
                await _repository.IsCnpjAlreadyRegisteredAsync(cnpj, (int)id) :
                await _repository.IsCnpjAlreadyRegisteredAsync(cnpj);

            if (isCnpjAlreadyRegistered)
            {
                throw new ConflictException("Cnpj conflict", "Cnpj already registered");
            }
        }
    }
}
