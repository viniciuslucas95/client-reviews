using Backend.Enum;

namespace Backend.Exception;

public class BadRequestException : ExceptionBase
{
    public BadRequestException(string name, string message) : base(name, message, StatusCode.BadRequest)
    {

    }
}
