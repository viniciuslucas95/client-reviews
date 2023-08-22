namespace Backend.Util.QueryBuilder.ClientReview;

public interface IClientReviewQueryBuilder
{
    /// <summary>
    /// Parameters: <b>ClientId</b>, <b>Score</b>, <b>Date</b> and <b>Reason</b>
    /// </summary>
    public string BuildCreateSql();
    /// <summary>
    /// Parameters: <b>Offset</b>
    /// </summary>
    public string BuildPaginateSql();
    public string BuildCountSql();
    /// <summary>
    /// Parameters: <b>Date</b>
    /// </summary>
    public string BuildIsDateAlreadyRegisteredSql();
}
