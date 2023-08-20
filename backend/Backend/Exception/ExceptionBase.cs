namespace Backend.Exception;

using Backend.Enum;
using SystemException = System.Exception;

public abstract class ExceptionBase : SystemException
{
    public string Name { get; }
    public override string Message { get; }
    public StatusCode StatusCode { get; }

    protected ExceptionBase(string name, string message, StatusCode statusCode) : base(message)
    {
        Name = name;
        Message = message;
        StatusCode = statusCode;
    }
}
