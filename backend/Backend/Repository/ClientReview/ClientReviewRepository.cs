using Backend.DTO;
using Backend.DTO.ClientReview;
using Backend.Util.QueryBuilder.ClientReview;
using Dapper;

namespace Backend.Repository.ClientReview;

public class ClientReviewRepository : RepositoryBase<IClientReviewQueryBuilder>, IClientReviewRepository
{
    public ClientReviewRepository(Database database, IClientReviewQueryBuilder queryBuilder) : base(database, queryBuilder)
    {

    }

    public async Task CreateManyAsync(IEnumerable<CreateClientReviewDto> dtos)
    {
        await Database.WithTransactionAsync(async (connection, transaction) =>
        {
            var sql = QueryBuilder.BuildCreateSql();

            return await connection.ExecuteAsync(sql, dtos, transaction);
        });
    }

    public async Task<PaginatedDto<PaginatedClientReviewDto>> GetPaginatedAsync(int offset = 0)
    {
        return await Database.WithConnectionAsync(async connection =>
        {
            var countSql = QueryBuilder.BuildCountSql();

            var countResult = await connection.QueryAsync<int>(countSql);

            var paginteSql = QueryBuilder.BuildPaginateSql();

            var items = await connection.QueryAsync<PaginatedClientReviewDto>(paginteSql, new { Offset = offset });

            return new PaginatedDto<PaginatedClientReviewDto>
            {
                Count = countResult.ToArray()[0],
                Items = items
            };
        });
    }
}
