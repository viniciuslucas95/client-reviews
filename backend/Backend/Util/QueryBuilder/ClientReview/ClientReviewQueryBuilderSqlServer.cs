namespace Backend.Util.QueryBuilder.ClientReview;

public class ClientReviewQueryBuilderSqlServer : IClientReviewQueryBuilder
{
    public string BuildCreateSql()
    {
        return "INSERT INTO client_reviews (client_id, date, score, reason) VALUES(@ClientId, @Date, @Score, @Reason);";
    }

    public string BuildPaginateSql()
    {
        return "WITH GroupedReviews AS (SELECT date AS Date, COUNT(*) as Total, SUM(CASE WHEN score >= 9 THEN 1 ELSE 0 END) AS Promotores, SUM(CASE WHEN score >= 7 AND score < 9 THEN 1 ELSE 0 END) AS Neutros, SUM(CASE WHEN score <= 7 THEN 1 ELSE 0 END) AS Detratores FROM client_reviews GROUP BY Date) SELECT Date, Total, CASE WHEN CAST((Promotores - Detratores) AS DECIMAL(3, 2)) / Total * 100 < 0 THEN 0 ELSE CAST((Promotores - Detratores) AS DECIMAL(3, 2)) / Total * 100 END AS NPS FROM GroupedReviews ORDER BY Date DESC OFFSET @Offset ROWS FETCH NEXT 10 ROWS ONLY;";
    }

    public string BuildCountSql()
    {
        return "WITH GroupedReviews AS (SELECT date AS Date, COUNT(*) as Total, SUM(CASE WHEN score >= 9 THEN 1 ELSE 0 END) AS Promotores, SUM(CASE WHEN score >= 7 AND score < 9 THEN 1 ELSE 0 END) AS Neutros, SUM(CASE WHEN score <= 7 THEN 1 ELSE 0 END) AS Detratores FROM client_reviews GROUP BY Date) SELECT COUNT(*) FROM GroupedReviews;";
    }

    public string BuildIsDateAlreadyRegisteredSql()
    {
        return "SELECT TOP 1 1 FROM client_reviews WHERE date = @Date;";
    }
}
