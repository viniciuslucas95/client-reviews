using Backend.Controller.Client.Dtos;
using Backend.Service;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controller.Client;

[Route("api/[controller]")]
[ApiController]
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
    public async Task<int> Post([FromBody] CreateClientDto dto)
    {
        return await _service.CreateAsync(dto.Name, dto.ContactName, dto.Date, dto.Cnpj);
    }

    //[HttpPut("{id}")]
    //public void Put(int id, [FromBody] string value)
    //{

    //}

    //[HttpDelete("{id}")]
    //public void Delete(int id)
    //{

    //}
}
