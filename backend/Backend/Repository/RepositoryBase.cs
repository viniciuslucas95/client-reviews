namespace Backend.Repository;

public abstract class RepositoryBase<Q>
{
    protected Database Database { get; }
    protected Q QueryBuilder { get; }

    protected RepositoryBase(Database database, Q queryBuilder)
    {
        Database = database;
        QueryBuilder = queryBuilder;
    }
}
