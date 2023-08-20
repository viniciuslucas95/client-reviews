namespace Backend.Util.QueryBuilder;

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
}
