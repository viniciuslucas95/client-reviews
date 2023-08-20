using System.Text.RegularExpressions;

namespace Backend.Util.Extension;

public static class StringExtension
{
    public static bool HasNonWhitespaceCharacters(this string value)
    {
        return Regex.IsMatch(value, @"\S");
    }
}
