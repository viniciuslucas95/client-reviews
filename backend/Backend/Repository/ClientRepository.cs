using Backend.Util.QueryBuilder;
using Dapper;

namespace Backend.Repository;

public class ClientRepository : RepositoryBase<IClientQueryBuilder>, IClientRepository
{
    public ClientRepository(Database database, IClientQueryBuilder queryBuilder) : base(database, queryBuilder)
    {

    }

    public async Task<int> CreateAsync(string name, string contactName, DateTime date, string? cnpj)
    {
        return await Database.WithConnectionAsync(async connection =>
        {
            var sql = QueryBuilder.BuildCreateSql(cnpj != null);
            var parameters = new
            {
                Name = name,
                ContactName = contactName,
                Date = date,
                Cnpj = cnpj
            };

            return await connection.ExecuteScalarAsync<int>(sql, parameters);
        });
    }

    public async Task UpdateAsync(int id, string name, string contactName, DateTime date, string? cnpj)
    {
        await Database.WithConnectionAsync(async connection =>
        {
            var sql = QueryBuilder.BuildUpdateSql(cnpj != null);
            var parameters = new
            {
                Id = id,
                Name = name,
                ContactName = contactName,
                Date = date,
                Cnpj = cnpj
            };

            return await connection.ExecuteScalarAsync<int>(sql, parameters);
        });
    }

    public async Task<bool> IsCnpjAlreadyRegisteredAsync(string cnpj, int? excludeId = null)
    {
        return await Database.WithConnectionAsync(async connection =>
        {
            var sql = QueryBuilder.BuildIsCnpjAlreadyRegisteredSql(excludeId);

            var results = await connection.QueryAsync<int>(sql, new { Cnpj = cnpj, Id = excludeId });

            var found = results.Any();

            return found;
        });
    }

    public async Task DeleteAsync(int id)
    {
        await Database.WithConnectionAsync(async connection =>
        {
            var sql = QueryBuilder.BuildDeleteSql();

            return await connection.QueryAsync<int>(sql, new { Id = id });
        });
    }

    public async Task<bool> DoesExistAsync(int id)
    {
        return await Database.WithConnectionAsync(async connection =>
        {
            var sql = QueryBuilder.BuildDoesExistSql();

            var results = await connection.QueryAsync<int>(sql, new { Id = id });

            var found = results.Any();

            return found;
        });
    }
}
