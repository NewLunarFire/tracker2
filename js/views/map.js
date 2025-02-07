import { to_snake_case } from "../util.js"

export class MapView {
    constructor(container_node)
    {
        this.container_node = container_node;
    }

    init(maps)
    {
        this.maps = maps;
        for(const location of maps["lightworld"].locations)
            this.#draw_location_box(location, this.container_node);
    }

    #draw_location_box(location, svg)
    {
        const id = to_snake_case(location.name);

        const width = location.checks.length > 1 ? 40 : 20;
        const height = location.checks.length > 1 ? 40 : 20;

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

        if(location.checks.length > 1)
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
            textPath.textContent = location.checks.length;

            text.appendChild(textPath);
            g.appendChild(path);
            g.appendChild(text);
        }

        svg.appendChild(g);
    }

    update(checks)
    {
        for(const location of this.maps["lightworld"].locations)
        {
            var check_count = 0;
            const location_id = to_snake_case(location.name);

            if(location.checks != null)
            {
                for(const c of location.checks)
                {
                    const check_val = checks.find(check => check.id == c)
                    if(check_val != null && check_val.value)
                    {
                        check_count += 1;
                    }
                }

                const location_box = this.container_node.querySelector(`#location-box-${location_id}`);
                const rect = location_box.querySelector("rect");
                const text_path = location_box.querySelector("textPath");
                
                if(text_path != null)
                {
                    text_path.textContent = `${check_count}/${location.checks.length}`;
                }

                if(check_count == location.checks.length)
                {
                    rect.setAttribute("fill", "rgba(127, 127, 127, 0.75)")
                }
            }
        }
    }
}
