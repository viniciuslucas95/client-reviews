namespace Backend.Exception;

using SystemException = System.Exception;

public abstract class ExceptionBase : SystemException
{
    public string Name { get; }
    public override string Message { get; }
    public int StatusCode { get; }

    protected ExceptionBase(string name, string message, int statusCode) : base(message)
    {
        Name = name;
        Message = message;
        StatusCode = statusCode;
    }
}
