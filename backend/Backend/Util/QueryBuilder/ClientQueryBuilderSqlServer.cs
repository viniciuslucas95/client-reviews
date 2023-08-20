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

    public string BuildIsCnpjAlreadyRegisteredSql()
    {
        return "SELECT TOP 1 1 FROM clients WHERE cnpj = @Cnpj;";
    }
}
