namespace Backend.Util.QueryBuilder.ClientReview;

public interface IClientReviewQueryBuilder
{
    /// <summary>
    /// Parameters: <b>ClientId</b>, <b>Score</b>, <b>Date</b> and <b>Reason</b>
    /// </summary>
    public string BuildCreateSql();
}
