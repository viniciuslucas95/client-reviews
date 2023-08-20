namespace Backend.Repository;

public abstract class ModelBase
{
    public int Id { get; }

    protected ModelBase(int id)
    {
        Id = id;
    }
}
