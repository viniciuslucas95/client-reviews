using Backend.Exception;
using Backend.Repository;
using Backend.Util.Extension;

namespace Backend.Service;

public class ClientService : IClientService
{
    private readonly IClientRepository _repository;

    public ClientService(IClientRepository repository)
    {
        _repository = repository;
    }

    public async Task<int> CreateAsync(string name, string contactName, DateTime date, string? cnpj)
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

            if (await _repository.IsCnpjAlreadyRegisteredAsync(cnpj))
            {
                throw new ConflictException("Cnpj conflict", "Cnpj already registered");
            }
        }

        return await _repository.CreateAsync(name, contactName, date, cnpj);
    }
}
