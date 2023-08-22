using Backend.DTO;
using Backend.DTO.ClientReview;
using Backend.Exception;
using Backend.Service.ClientReview;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controller;

[Route("api/client-reviews")]
[ApiController]
[Produces("application/json", "text/plain")]
public class ClientReviewController : ControllerBase
{
    private readonly IClientReviewService _service;

    public ClientReviewController(IClientReviewService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SwaggerException), StatusCodes.Status400BadRequest)]
    public async Task<PaginatedDto<PaginatedClientReviewDto>> Paginate([FromQuery] int offset = 0)
    {
        if (offset < 0)
        {
            throw new BadRequestException("Invalid type", "Offset cannot be lower than 0");
        }

        return await _service.GetPaginatedAsync(offset);
    }

    [HttpPost]
    [ProducesResponseType(typeof(int), StatusCodes.Status201Created)]
    public async Task Post([FromBody] IEnumerable<CreateClientReviewDto> dtos)
    {
        await _service.CreateManyAsync(dtos);
    }
}
