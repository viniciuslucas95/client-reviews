using Xunit;

namespace Backend.Util.QueryBuilder.Client;

public class ClientQueryBuilderSqlServerTest
{
    [Theory]
    [InlineData()]
    [InlineData(true)]
    public void BuildCreateSqlTest(bool includeCnpj = false)
    {
        var queryBuilder = new ClientQueryBuilderSqlServer();
        var sql = queryBuilder.BuildCreateSql(includeCnpj);

        var expected = !includeCnpj ?
            "INSERT INTO clients (name, contact_name, date) OUTPUT Inserted.id VALUES(@Name, @ContactName, @Date);" :
            "INSERT INTO clients (name, contact_name, date, cnpj) OUTPUT Inserted.id VALUES(@Name, @ContactName, @Date, @Cnpj);";

        Assert.Equal(expected, sql);
    }

    [Theory]
    [InlineData()]
    [InlineData(true)]
    public void BuildUpdateSqlTest(bool includeCnpj = false)
    {
        var queryBuilder = new ClientQueryBuilderSqlServer();
        var sql = queryBuilder.BuildUpdateSql(includeCnpj);

        var expected = !includeCnpj ?
            "UPDATE clients SET name = @Name, contact_name = @ContactName, date = @Date WHERE id = @Id;" :
            "UPDATE clients SET name = @Name, contact_name = @ContactName, date = @Date, cnpj = @Cnpj WHERE id = @Id;";

        Assert.Equal(expected, sql);
    }

    [Theory]
    [InlineData(null)]
    [InlineData(5)]
    public void BuildIsCnpjAlreadyRegisteredSqlTest(int? excludeId)
    {
        var queryBuilder = new ClientQueryBuilderSqlServer();
        var sql = queryBuilder.BuildIsCnpjAlreadyRegisteredSql(excludeId);

        var expected = excludeId is null ?
            "SELECT TOP 1 1 FROM clients WHERE cnpj = @Cnpj;" :
            "SELECT TOP 1 1 FROM clients WHERE cnpj = @Cnpj AND id != @Id;";

        Assert.Equal(expected, sql);
    }

    [Fact]
    public void BuildDoesExistSqlTest()
    {
        var queryBuilder = new ClientQueryBuilderSqlServer();
        var sql = queryBuilder.BuildDoesExistSql();

        var expected = "SELECT TOP 1 1 FROM clients WHERE id = @Id;";

        Assert.Equal(sql, expected);
    }

    [Fact]
    public void BuildDeleteSqlTest()
    {
        var queryBuilder = new ClientQueryBuilderSqlServer();
        var sql = queryBuilder.BuildDeleteSql();

        var expected = "DELETE FROM clients WHERE id = @Id;";

        Assert.Equal(sql, expected);
    }

    [Fact]
    public void BuildCountSqlTest()
    {
        var queryBuilder = new ClientQueryBuilderSqlServer();
        var sql = queryBuilder.BuildCountSql();

        var expected = "SELECT COUNT(*) FROM clients;";

        Assert.Equal(sql, expected);
    }

    [Fact]
    public void BuildPaginateSqlTest()
    {
        var queryBuilder = new ClientQueryBuilderSqlServer();
        var sql = queryBuilder.BuildPaginateSql();

        var expected = "SELECT *, contact_name AS \"ContactName\" FROM clients ORDER BY name OFFSET @Offset ROWS FETCH NEXT 10 ROWS ONLY;";

        Assert.Equal(sql, expected);
    }

    [Fact]
    public void BuildGetSqlTest()
    {
        var queryBuilder = new ClientQueryBuilderSqlServer();
        var sql = queryBuilder.BuildGetSql();

        var expected = "SELECT *, contact_name AS \"ContactName\" FROM clients WHERE Id = @Id;";

        Assert.Equal(sql, expected);
    }
}
