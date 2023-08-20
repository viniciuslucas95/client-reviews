using System.ComponentModel.DataAnnotations;

namespace Backend.DTO.Client;

public class CreateClientDto
{
#pragma warning disable CS8618
    [MinLength(1)]
    [Required]
    public string Name { get; set; }

    [MinLength(1)]
    [Required]
    public string ContactName { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [MinLength(14)]
    [MaxLength(14)]
    public string? Cnpj { get; set; }
#pragma warning restore CS8618
}
