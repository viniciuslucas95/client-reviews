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
}
