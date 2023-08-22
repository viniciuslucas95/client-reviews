using Backend.DTO;
using Backend.DTO.ClientReview;
using Backend.Repository.ClientReview;

namespace Backend.Service.ClientReview;

public class ClientReviewService : IClientReviewService
{
    private readonly IClientReviewRepository _repository;

    public ClientReviewService(IClientReviewRepository repository)
    {
        _repository = repository;
    }

    public async Task CreateManyAsync(IEnumerable<CreateClientReviewDto> dtos)
    {
        await _repository.CreateManyAsync(dtos);
    }

    public async Task<PaginatedDto<PaginatedClientReviewDto>> GetPaginatedAsync(int offset = 0)
    {
        return await _repository.GetPaginatedAsync(offset);
    }

    public async Task<bool> IsDateAlreadyRegisteredAsync(DateTime date)
    {
        return await _repository.IsDateAlreadyRegisteredAsync(date);
    }
}
