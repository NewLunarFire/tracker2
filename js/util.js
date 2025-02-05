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
