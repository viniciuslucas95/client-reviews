namespace Backend.DTO.ClientReview;

public class PaginatedClientReviewDto
{
#pragma warning disable CS8618
    public DateTime Date { get; set; }
    public int Total { get; set; }
    public int NPS { get; set; }
#pragma warning restore CS8618
}
