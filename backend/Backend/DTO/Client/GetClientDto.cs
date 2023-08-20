namespace Backend.DTO.Client;

public class GetClientDto
{
#pragma warning disable CS8618
    public string Name { get; set; }
    public string ContactName { get; set; }
    public DateTime Date { get; set; }
    public string? Cnpj { get; set; }
#pragma warning restore CS8618
}
