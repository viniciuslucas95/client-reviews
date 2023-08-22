namespace Backend.DTO.Client;

public class PaginatedClientReviewCreationDto
{
#pragma warning disable CS8618
    public int Id { get; set; }
    public string Name { get; set; }
    public string ContactName { get; set; }
    public string? Cnpj { get; set; }
    public DateTime? LastReviewDate { get; set; }
#pragma warning restore CS8618
}
