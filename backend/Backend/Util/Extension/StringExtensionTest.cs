using Xunit;

namespace Backend.Util.Extension;

public class StringExtensionTest
{
    [Theory]
    [InlineData("   ", false)]
    [InlineData("Usuário 1", true)]
    public void HasNonWhitespaceCharactersTest(string value, bool expected)
    {
        var result = value.HasNonWhitespaceCharacters();

        Assert.Equal(result, expected);
    }
}
