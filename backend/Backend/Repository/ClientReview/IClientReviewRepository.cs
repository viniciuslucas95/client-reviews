using Backend.DTO;
using Backend.DTO.ClientReview;

namespace Backend.Repository.ClientReview;

public interface IClientReviewRepository
{
    public Task CreateManyAsync(IEnumerable<CreateClientReviewDto> dtos);
    public Task<PaginatedDto<PaginatedClientReviewDto>> GetPaginatedAsync(int offset = 0);
    public Task<bool> IsDateAlreadyRegisteredAsync(DateTime date);
}
