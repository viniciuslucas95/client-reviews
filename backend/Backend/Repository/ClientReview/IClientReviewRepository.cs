using Backend.DTO.ClientReview;

namespace Backend.Repository.ClientReview;

public interface IClientReviewRepository
{
    public Task CreateManyAsync(IEnumerable<CreateClientReviewDto> dtos);
}
