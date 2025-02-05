function convert_to_hexa(data)
{
    var result = "";
    for(var i = 0; i < data.length / 16; i++)
    {
        var start = i * 16;
        var line = data.slice(start, start + 16);
        result += toHex(line) + "\n";
    }

    return result;
}

function toHex(numbers)
{
    return numbers.map(cell => cell.toString(16).toUpperCase().padStart(2, '0')).join(" ");
}

function to_snake_case(value)
{
    return value.toLowerCase()
        .replaceAll(/\s/g, "-") // Replace all whitespace with dashes
        .replaceAll(/[^a-z0-9-]/g, "") // Remove all non-alphanumeric characters (preserve dashes)
        .replaceAll(/-+/g, "-") // Replace all repeated dashes with a single one
        .replaceAll(/^-+/g, "") // Remove any dashes at the start of the string
        .replaceAll(/-+$/g, "") // Remove any dashes at the end of the string
}

export { to_snake_case }