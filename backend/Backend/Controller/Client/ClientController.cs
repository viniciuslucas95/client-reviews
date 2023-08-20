using Backend.Controller.Client.Dtos;
using Backend.Service;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controller.Client;

[Route("api/[controller]")]
[ApiController]
[Produces("application/json", "text/plain")]
public class ClientController : ControllerBase
{
    private readonly IClientService _service;

    public ClientController(IClientService service)
    {
        _service = service;
    }

    //[HttpGet]
    //public IEnumerable<string> Get()
    //{
    //    return new string[] { "value1", "value2" };
    //}

    //[HttpGet("{id}")]
    //public string Get(int id)
    //{
    //    return "value";
    //}

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
