using Backend.DTO;
using Backend.DTO.Client;
using Backend.Exception;
using Backend.Service;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controller;

[Route("api/clients")]
[ApiController]
[Produces("application/json", "text/plain")]
public class ClientController : ControllerBase
{
    private readonly IClientService _service;

    public ClientController(IClientService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SwaggerException), StatusCodes.Status400BadRequest)]
    public async Task<PaginatedDto<PaginatedClientDto>> Paginate([FromQuery] int offset = 0)
    {
        if (offset < 0)
        {
            throw new BadRequestException("Invalid type", "Offset cannot be lower than 0");
        }

        return await _service.GetPaginatedAsync(offset);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(SwaggerException), StatusCodes.Status404NotFound)]
    public async Task<GetClientDto?> Get(int id)
    {
        return await _service.GetAsync(id);
    }

    [HttpPost]
    [ProducesResponseType(typeof(int), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(SwaggerException), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(SwaggerException), StatusCodes.Status409Conflict)]
    public async Task<int> Post([FromBody] CreateClientDto dto)
    {
        return await _service.CreateAsync(dto.Name, dto.ContactName, dto.Date, dto.Cnpj);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(int), StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(SwaggerException), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(SwaggerException), StatusCodes.Status409Conflict)]
    public async Task Put(int id, [FromBody] UpdateClientDto dto)
    {
        await _service.UpdateAsync(id, dto.Name, dto.ContactName, dto.Date, dto.Cnpj);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(int), StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(SwaggerException), StatusCodes.Status404NotFound)]
    public async Task Delete(int id)
    {
        await _service.DeleteAsync(id);
    }
}
