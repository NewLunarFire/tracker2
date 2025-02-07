export class ChecksView {
    constructor(container_node)
    {
        this.container_node = container_node;
    }

    init(maps, checks)
    {
        let checks_by_map = Object.groupBy(checks, check => check.map);

        for(let current_map in checks_by_map)
        {
            const details = document.createElement("details");
            const summary = document.createElement("summary");
            summary.textContent = maps[current_map].displayName;
            details.appendChild(summary);
            
            for(let check of checks_by_map[current_map])
            {
                const p = document.createElement('p');
                const title = document.createElement('span');
                
                title.id = `check-${check.id}-title`;
                title.textContent = check.name;

                const value = document.createElement('span');
                
                value.id = `check-${check.id}-value`;
                value.textContent = "No";

                p.appendChild(title);
                p.appendChild(document.createTextNode(": "));
                p.appendChild(value);

                details.appendChild(p);
            }

            this.container_node.appendChild(details);
        }
    }

    update(checks)
    {
        for(var check of checks)
            document.querySelector(`#check-${check.id}-value`).textContent = check.value ? "Yes" : "No";
    }
}