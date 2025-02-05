function to_snake_case(value)
{
    return value.toLowerCase()
        .replaceAll(/\s/g, "-") // Replace all whitespace with dashes
        .replaceAll(/[^a-z0-9-]/g, "") // Remove all non-alphanumeric characters (preserve dashes)
        .replaceAll(/-+/g, "-") // Replace all repeated dashes with a single one
        .replaceAll(/^-+/g, "") // Remove any dashes at the start of the string
        .replaceAll(/-+$/g, "") // Remove any dashes at the end of the string
}

function draw_location_box(location, svg)
{
    const id = to_snake_case(location.name);

    const width = location.count > 1 ? 40 : 20;
    const height = location.count > 1 ? 40 : 20;

    const top = location.y - (height / 2);
    const left = location.x - (width / 2);
    
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.id = `location-box-${id}`
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", left);
    rect.setAttribute("y", top);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("stroke", "black");
    rect.setAttribute("fill", "rgba(63, 63, 255, 0.75)");
    
    const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    title.textContent = location.name;

    rect.appendChild(title);
    g.appendChild(rect);

    if(location.count > 1)
    {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const path_id = `P-${id}`
        path.id = path_id;
        path.setAttribute("pathLength", 2);
        path.setAttribute("d", `M${left} ${location.y}h${width}`);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const textPath = document.createElementNS("http://www.w3.org/2000/svg", "textPath");
        textPath.setAttribute("href", `#${path_id}`);
        textPath.setAttribute("startOffset", "1");
        textPath.setAttribute("text-anchor", "middle");
        textPath.setAttribute("dominant-baseline", "middle");
        textPath.setAttribute("fill", "black");
        textPath.setAttribute("font-size", "14px");
        textPath.textContent = location.count;

        text.appendChild(textPath);
        g.appendChild(path);
        g.appendChild(text);
    }

    svg.appendChild(g);
}

export default { draw_location_box }