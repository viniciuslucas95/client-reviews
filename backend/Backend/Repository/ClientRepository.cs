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

    public async Task<bool> IsCnpjAlreadyRegisteredAsync(string cnpj)
    {
        return await Database.WithConnectionAsync(async connection =>
        {
            var sql = QueryBuilder.BuildIsCnpjAlreadyRegisteredSql();

            var results = await connection.QueryAsync<int>(sql, new { Cnpj = cnpj });

            var found = results.Any();

            return found;
        });
    }
}
