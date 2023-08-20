using System.Data.SqlClient;

namespace Backend.Repository;

public class Database
{
    private readonly string _connectionString;

    public Database(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<T> WithConnectionAsync<T>(Func<SqlConnection, Task<T>> exec)
    {
        using var connection = new SqlConnection(_connectionString);

        connection.Open();

        var results = await exec(connection);

        connection.Close();

        return results;
    }
}
