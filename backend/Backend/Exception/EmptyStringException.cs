namespace Backend.Exception;

public class EmptyStringException : BadRequestException
{
    public EmptyStringException(string message) : base("Empty String", message)
    {

    }
}
