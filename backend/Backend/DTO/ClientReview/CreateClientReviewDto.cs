using System.ComponentModel.DataAnnotations;

namespace Backend.DTO.ClientReview;

public class CreateClientReviewDto
{
#pragma warning disable CS8618
    [Required]
    [MinLength(1)]
    public int ClientId { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    public int Score { get; set; }

    [Required]
    public string Reason { get; set; }
#pragma warning restore CS8618
}
