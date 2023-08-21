namespace Backend.Util.QueryBuilder.Client;

public class ClientQueryBuilderSqlServer : IClientQueryBuilder
{
    public string BuildCreateSql(bool includeCnpj = false)
    {
        string sql = "INSERT INTO clients (name, contact_name, date";

        if (includeCnpj)
        {
            sql += ", cnpj";
        }

        sql += ") OUTPUT Inserted.id VALUES(@Name, @ContactName, @Date";

        if (includeCnpj)
        {
            sql += ", @Cnpj";
        }

        sql += ");";

        return sql;
    }

    public string BuildUpdateSql(bool includeCnpj = false)
    {
        string sql = "UPDATE clients SET name = @Name, contact_name = @ContactName, date = @Date";

        if (includeCnpj)
        {
            sql += ", cnpj = @Cnpj";
        }

        sql += " WHERE id = @Id;";

        return sql;
    }

    public string BuildIsCnpjAlreadyRegisteredSql()
    {
        var sql = "SELECT TOP 1 1 FROM clients WHERE cnpj = @Cnpj;";

        return sql;
    }

    public string BuildIsCnpjAlreadyRegisteredSql(int? excludeId)
    {
        var sql = "SELECT TOP 1 1 FROM clients WHERE cnpj = @Cnpj";

        if (excludeId != null)
        {
            sql += " AND id != @Id";
        }

        sql += ";";

        return sql;
    }

    public string BuildDoesExistSql()
    {
        return "SELECT TOP 1 1 FROM clients WHERE id = @Id;";
    }

    public string BuildDeleteSql()
    {
        return "DELETE FROM clients WHERE id = @Id;";
    }

    public string BuildCountSql()
    {
        return "SELECT COUNT(*) FROM clients;";
    }

    public string BuildPaginateSql()
    {
        return "SELECT a.id, a.\"name\", a.contact_name as \"ContactName\", a.cnpj, a.date, b.score FROM clients AS a LEFT JOIN client_reviews AS b ON a.id = b.client_id AND b.date = (SELECT MAX(date) FROM client_reviews WHERE client_id = a.id) ORDER BY name OFFSET @Offset ROWS FETCH NEXT 10 ROWS ONLY;";
    }

    public string BuildGetSql()
    {
        return "SELECT *, contact_name AS \"ContactName\" FROM clients WHERE Id = @Id;";
    }
}
