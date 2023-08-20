namespace Backend.DTO.Client;

public class PaginatedClientDto
{
#pragma warning disable CS8618
    public int Id { get; set; }
    public string Name { get; set; }
    public string ContactName { get; set; }
    public DateTime Date { get; set; }
    public string? Cnpj { get; set; }
#pragma warning restore CS8618
}
