namespace Backend.Exception;

public class BadRequestException : ExceptionBase
{
    public BadRequestException(string name, string message) : base(name, message, StatusCodes.Status400BadRequest)
    {

    }
}
