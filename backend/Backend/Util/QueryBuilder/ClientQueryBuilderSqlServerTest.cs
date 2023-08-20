using Xunit;

namespace Backend.Util.QueryBuilder;

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

    [Fact]
    public void BuildIsCnpjAlreadyRegisteredSqlTest()
    {
        var queryBuilder = new ClientQueryBuilderSqlServer();
        var sql = queryBuilder.BuildIsCnpjAlreadyRegisteredSql();

        var expected = "SELECT TOP 1 1 FROM clients WHERE cnpj = @Cnpj;";

        Assert.Equal(expected, sql);
    }
}
