using Backend.DTO.ClientReview;
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

    [HttpPost]
    [ProducesResponseType(typeof(int), StatusCodes.Status201Created)]
    public async Task Post([FromBody] IEnumerable<CreateClientReviewDto> dtos)
    {
        await _service.CreateManyAsync(dtos);
    }
}
