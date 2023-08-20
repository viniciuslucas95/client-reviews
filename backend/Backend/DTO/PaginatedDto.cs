namespace Backend.DTO;

public class PaginatedDto<T>
{
#pragma warning disable CS8618
    public int Count { get; set; }
    public IEnumerable<T> Items { get; set; }
#pragma warning restore CS8618
}
