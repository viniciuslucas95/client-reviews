namespace Backend.Util;

public class ConnectionStringBuilderSqlServer
{
    public string Build()
    {
        var host = Environment.GetEnvironmentVariable("DATABASE_HOST") ?? "database";
        var port = Environment.GetEnvironmentVariable("DATABASE_PORT") ?? "1433";
        var name = Environment.GetEnvironmentVariable("DATABASE_NAME") ?? "dev";
        var password = Environment.GetEnvironmentVariable("DATABASE_PASSWORD") ?? "superADMIN123!@#";

        return $"Server={host},{port};Database={name};User Id=sa;Password={password};";
    }
}