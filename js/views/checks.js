export class ChecksView {
    constructor(container_node, store)
    {
        this.container_node = container_node;
        this.store = store;
        this.categories = {}
        this.store.on_check_added(this.#on_check_added.bind(this));
        this.store.on_check_updated(this.#on_check_updated.bind(this));
    }

    init(maps)
    {
        this.maps = maps;
        
        for(let current_map in maps)
        {
            const map = this.maps[current_map];
            map.check_count = 0;
            map.checked_count = 0;

            const details = document.createElement("details");
            const summary = document.createElement("summary");
            summary.textContent = maps[current_map].displayName + " ";

            const count_span = document.createElement("span");
            count_span.id = `checks-${current_map}-count`;
            count_span.innerHTML = `[0/0]`;

            summary.appendChild(count_span);
            details.appendChild(summary);
            
            this.categories[current_map] = details;
            this.container_node.appendChild(details); 
        }
    }

    #on_check_added(check)
    {
        const map = this.maps[check.map];
        map.check_count++;

        const category = this.categories[check.map];
        const p = this.#create_check_element(check);
        category.appendChild(p);

        this.#update_check_count(check.map);
    }

    #on_check_updated(check)
    {
        const map = this.maps[check.map];
        map.checked_count += check.is_checked ? 1 : -1;

        document.querySelector(`#check-${check.id}-logic`).textContent = check.in_logic ? "In Logic" : "Not In Logic";
        document.querySelector(`#check-${check.id}-value`).textContent = check.is_checked ? "Yes" : "No";

        this.#update_check_count(check.map);
    }

    #create_check_element(check)
    {
        const div = document.createElement('div');

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

        const p_logic = document.createElement('p');
        p_logic.id = `check-${check.id}-logic`;
        p_logic.style.fontSize = "10pt";
        p_logic.textContent = check.in_logic ? "In Logic" : "Not In Logic";

        div.appendChild(p);
        div.appendChild(p_logic);
        
        return div;
    }

    #update_check_count(map)
    {
        const total = this.maps[map].check_count;
        const count = this.maps[map].checked_count;
        document.querySelector(`#checks-${map}-count`).textContent = `[${count}/${total}]`;
    }
}