using Backend.DTO.ClientReview;

namespace Backend.Service.ClientReview;

public interface IClientReviewService
{
    public Task CreateManyAsync(IEnumerable<CreateClientReviewDto> dtos);
}
