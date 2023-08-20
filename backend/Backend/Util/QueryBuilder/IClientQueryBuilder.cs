namespace Backend.Util.QueryBuilder;

public interface IClientQueryBuilder
{
    /// <summary>
    /// Parameters name: <b>Name</b>, <b>ContactName</b>, <b>Date</b> and <b>Cnpj</b>
    /// </summary>
    public string BuildCreateSql(bool cnpj);
    /// <summary>
    /// Parameters name: <b>Cnpj</b>
    /// </summary>
    public string BuildIsCnpjAlreadyRegisteredSql();
}
