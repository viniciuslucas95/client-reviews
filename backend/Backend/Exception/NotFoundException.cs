namespace Backend.Exception;

public class NotFoundException : ExceptionBase
{
    public NotFoundException(string name, string message) : base(name, message, StatusCodes.Status404NotFound)
    {

    }
}
