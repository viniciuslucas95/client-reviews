namespace Backend.Util.QueryBuilder.ClientReview;

public class ClientReviewQueryBuilderSqlServer : IClientReviewQueryBuilder
{
    public string BuildCreateSql()
    {
        return "INSERT INTO client_reviews (client_id, date, score, reason) VALUES(@ClientId, @Date, @Score, @Reason);";
    }
}
