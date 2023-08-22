using Backend.DTO;
using Backend.DTO.Client;
using Backend.Util.QueryBuilder.Client;
using Dapper;

namespace Backend.Repository.Client;

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

    public async Task<PaginatedDto<PaginatedClientDto>> GetPaginatedAsync(int offset = 0)
    {
        return await Database.WithConnectionAsync(async connection =>
        {
            var countSql = QueryBuilder.BuildCountSql();

            var countResult = await connection.QueryAsync<int>(countSql);

            var paginteSql = QueryBuilder.BuildPaginateSql();

            var items = await connection.QueryAsync<PaginatedClientDto>(paginteSql, new { Offset = offset });

            return new PaginatedDto<PaginatedClientDto>
            {
                Count = countResult.ToArray()[0],
                Items = items
            };
        });
    }

    public async Task<PaginatedDto<PaginatedClientReviewCreationDto>> GetPaginatedForReviewCreationAsync(int offset = 0)
    {
        return await Database.WithConnectionAsync(async connection =>
        {
            var countSql = QueryBuilder.BuildCountSql();

            var countResult = await connection.QueryAsync<int>(countSql);

            var paginteSql = QueryBuilder.BuildPaginateForReviewCreationSql();

            var items = await connection.QueryAsync<PaginatedClientReviewCreationDto>(paginteSql, new { Offset = offset });

            return new PaginatedDto<PaginatedClientReviewCreationDto>
            {
                Count = countResult.ToArray()[0],
                Items = items
            };
        });
    }

    public async Task<GetClientDto?> GetAsync(int id)
    {
        return await Database.WithConnectionAsync(async connection =>
        {
            var sql = QueryBuilder.BuildGetSql();

            var result = await connection.QueryAsync<GetClientDto>(sql, new { Id = id });

            return result.Any() ? result.ToArray()[0] : null;
        });
    }
}
