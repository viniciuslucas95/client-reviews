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
}
