﻿using Xunit;

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

    [Theory]
    [InlineData(true)]
    [InlineData(false)]
    public void BuildCountSqlTest(bool includeName)
    {
        var queryBuilder = new ClientQueryBuilderSqlServer();
        var sql = queryBuilder.BuildCountSql(includeName);

        var expected = includeName ?
            "SELECT COUNT(*) FROM clients WHERE LOWER(name) LIKE LOWER(@Name);" :
            "SELECT COUNT(*) FROM clients;";

        Assert.Equal(sql, expected);
    }

    [Theory]
    [InlineData(true)]
    [InlineData(false)]
    public void BuildPaginateSqlTest(bool includeName)
    {
        var queryBuilder = new ClientQueryBuilderSqlServer();
        var sql = queryBuilder.BuildPaginateSql(includeName);

        var expected = includeName ?
            "SELECT a.id, a.\"name\", a.contact_name as \"ContactName\", a.cnpj, a.date, b.score FROM clients AS a LEFT JOIN client_reviews AS b ON a.id = b.client_id AND b.date = (SELECT MAX(date) FROM client_reviews WHERE client_id = a.id) WHERE LOWER(name) LIKE LOWER(@Name) ORDER BY name OFFSET @Offset ROWS FETCH NEXT 10 ROWS ONLY;" :
            "SELECT a.id, a.\"name\", a.contact_name as \"ContactName\", a.cnpj, a.date, b.score FROM clients AS a LEFT JOIN client_reviews AS b ON a.id = b.client_id AND b.date = (SELECT MAX(date) FROM client_reviews WHERE client_id = a.id) ORDER BY name OFFSET @Offset ROWS FETCH NEXT 10 ROWS ONLY;";

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
