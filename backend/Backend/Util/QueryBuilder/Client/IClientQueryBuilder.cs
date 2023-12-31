﻿namespace Backend.Util.QueryBuilder.Client;

public interface IClientQueryBuilder
{
    /// <summary>
    /// Parameters: <b>Name</b>, <b>ContactName</b>, <b>Date</b> and <b>Cnpj</b>
    /// </summary>
    public string BuildCreateSql(bool includeCnpj);
    /// <summary>
    /// Parameters: <b>Id</b>, <b>Name</b>, <b>ContactName</b>, <b>Date</b> and <b>Cnpj</b>
    /// </summary>
    public string BuildUpdateSql(bool includeCnpj);
    /// <summary>
    /// Parameters: <b>Cnpj</b>
    /// </summary>
    public string BuildIsCnpjAlreadyRegisteredSql();
    /// <summary>
    /// Parameters: <b>Cnpj</b>
    /// </summary>
    public string BuildIsCnpjAlreadyRegisteredSql(int? excludeId);
    /// <summary>
    /// Parameters: <b>Id</b>
    /// </summary>
    public string BuildDoesExistSql();
    /// <summary>
    /// Parameters: <b>Id</b>
    /// </summary>
    public string BuildDeleteSql();
    /// <summary>
    /// Parameters: <b>Name</b>
    /// </summary>
    public string BuildCountSql(bool includeName);
    /// <summary>
    /// Parameters: <b>Offset</b> and <b>Name</b>
    /// </summary>
    public string BuildPaginateSql(bool includeName);
    /// <summary>
    /// Parameters: <b>Id</b>
    /// </summary>
    public string BuildGetSql();
    /// <summary>
    /// Parameters: <b>Offset</b> and <b>Name</b>
    /// </summary>
    public string BuildPaginateForReviewCreationSql(bool includeName);
}
