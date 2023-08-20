namespace Backend.Exception;

public class ConflictException : ExceptionBase
{
    public ConflictException(string name, string message) : base(name, message, StatusCodes.Status409Conflict)
    {

    }
}
