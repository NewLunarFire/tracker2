export class ChecksView {
    constructor(container_node)
    {
        this.container_node = container_node;
    }

    init(maps, checks)
    {
        this.maps = structuredClone(maps);
        this.checks = structuredClone(checks);

        let checks_by_map = Object.groupBy(checks, check => check.map);

        for(let current_map in checks_by_map)
        {
            const current_checks = checks_by_map[current_map];
            this.maps[current_map].check_count = current_checks.length;

            const details = document.createElement("details");
            const summary = document.createElement("summary");
            summary.textContent = this.maps[current_map].displayName + " ";

            const count_span = document.createElement("span");
            count_span.id = `checks-${current_map}-count`;
            count_span.innerHTML = `[0/${current_checks.length}]`;

            summary.appendChild(count_span);
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
        const checks_per_maps = Object.assign({}, ...Object.keys(this.maps).map((x) => ({[x]: 0})));
        
        for(let check of checks)
        {
            document.querySelector(`#check-${check.id}-value`).textContent = check.value ? "Yes" : "No";

            const current_map = this.checks.find(c => c.id === check.id).map;
            if(!!check.value)
                checks_per_maps[current_map]  += 1;
        }

        for (const [map, count] of Object.entries(checks_per_maps)) {
            const total = this.maps[map].check_count;
            document.querySelector(`#checks-${map}-count`).textContent = `[${count}/${total}]`;
        }
    }
}