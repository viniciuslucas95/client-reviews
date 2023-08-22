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

    public string BuildCountSql(bool includeName)
    {
        var sql = "SELECT COUNT(*) FROM clients";

        if (includeName)
        {
            sql += " WHERE LOWER(name) LIKE LOWER(@Name)";
        }

        sql += ";";

        return sql;
    }

    public string BuildPaginateSql(bool includeName)
    {
        var sql = "SELECT a.id, a.\"name\", a.contact_name as \"ContactName\", a.cnpj, a.date, b.score FROM clients AS a LEFT JOIN client_reviews AS b ON a.id = b.client_id AND b.date = (SELECT MAX(date) FROM client_reviews WHERE client_id = a.id)";

        if (includeName)
        {
            sql += " WHERE LOWER(name) LIKE LOWER(@Name)";
        }

        sql += " ORDER BY name OFFSET @Offset ROWS FETCH NEXT 10 ROWS ONLY;";

        return sql;
    }

    public string BuildGetSql()
    {
        return "SELECT *, contact_name AS \"ContactName\" FROM clients WHERE Id = @Id;";
    }

    public string BuildPaginateForReviewCreationSql(bool includeName)
    {
        var sql = "SELECT a.id, a.\"name\", a.contact_name as \"ContactName\", a.cnpj, b.date as \"LastReviewDate\" FROM clients AS a LEFT JOIN client_reviews AS b ON a.id = b.client_id AND b.date = (SELECT MAX(date) FROM client_reviews WHERE client_id = a.id) ORDER BY name";

        if (includeName)
        {
            sql += " WHERE LOWER(name) LIKE LOWER(@Name)";
        }

        sql += " OFFSET @Offset ROWS FETCH NEXT 10 ROWS ONLY;";

        return sql;
    }
}
