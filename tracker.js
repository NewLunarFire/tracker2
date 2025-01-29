export default class Tracker
{
    constructor(plugin, snes)
    {
        this.plugin = plugin;
        this.snes = snes;
        this.updateTimer = null;
        this.attach = this.attach.bind(this);
        this.connect = this.connect.bind(this);
        this.update = this.update.bind(this);
    }

    init_layout()
    {
        var inventory_container = document.querySelector("#inventory-container");

        for(var item of this.plugin.get_inventory())
        {
            const p = document.createElement('p');
            const title = document.createElement('span');
            
            title.id = `inventory-${item.id}-title`;
            title.textContent = item.name;

            const value = document.createElement('span');
            
            value.id = `inventory-${item.id}-value`;

            if(item.type == "state")
                value.textContent = item.states[0];
            else if(item.type == "boolean")
                value.textContent = "No";
            else if(item.type == "count")
                value.textContent = "0";

            p.appendChild(title);
            p.appendChild(document.createTextNode(": "));
            p.appendChild(value);

            inventory_container.appendChild(p);
        }

        var checks_container = document.querySelector("#checks-container");

        var checks = this.plugin.get_checks()
        var checks_by_map = Object.groupBy(checks, check => check.map);

        for(var map in checks_by_map)
        {
            const details = document.createElement("details");
            const summary = document.createElement("summary");
            summary.textContent = map;
            details.appendChild(summary);
            
            for(var check of checks_by_map[map])
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

            checks_container.appendChild(details);
        }
    }

    disconnect()
    {
        clearInterval(updateTimer);

        this.snes.disconnect()
        const connect_button = document.querySelector("#connect");

        connect_button.textContent = "Connect";
        connect_button.onclick = connect;
    }

    async connect()
    {
        await this.snes.connect();
        const connect_button = document.querySelector("#connect");
        connect_button.textContent = "Disconnect";
        connect_button.onclick = this.disconnect;

        const device_list = await this.snes.request_device_list()
        this.populate_device_list(device_list);
    }

    async attach()
    {
        const device = document.querySelector("#device-select").value;
        await this.snes.attach(device);
        const device_info = await this.snes.get_device_info();

        document.querySelector("#device-info").textContent = `${device_info.name} ${device_info.version} running ${device_info.file}`
        await this.update();

        this.updateTimer = setInterval(this.update, 5000);
    }

    populate_device_list(device_list)
    {
        const device_select = document.querySelector("#device-select");
        const device_attach_button = document.querySelector("#device-attach-button");
        device_select.options.length = 0;

        if(device_list.length > 0)
        {
            for(const device of device_list)
            {
                const option = document.createElement('option');
                option.value = device;
                option.textContent = device;
                device_select.options.add(option);
            }

            device_select.disabled = false;
            device_attach_button.disabled = false;
        }
        else
        {
            const option = document.createElement('option');
            option.textContent = "No device available";
            device_select.options.add(option);

            device_select.disabled = true;
            device_attach_button.disabled = false;
        }
    }

    async update()
    {
        const state = await this.plugin.read_state()
        this.update_inventory(state.inventory)
        this.update_checks(state.checks)
    }

    update_inventory(inventory)
    {
        for(var item of inventory)
            document.querySelector(`#inventory-${item.id}-value`).textContent = item.value;
    }

    update_checks(checks)
    {
        for(var check of checks)
            document.querySelector(`#check-${check.id}-value`).textContent = check.value ? "Yes" : "No";
    }
}
