namespace Backend.Exception;

public class InvalidTypeException : ExceptionBase
{
    public InvalidTypeException(string name, string message) : base(name, message, StatusCodes.Status400BadRequest)
    {

    }
}
