import map_view from "./map_view.js"
import { to_snake_case } from "./util.js"
import { InventoryView } from "./views/inventory.js"

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
        this.views = {
            inventory: new InventoryView(document.querySelector("#inventory-sprite-container"))
        }
    }

    init_layout()
    {
        this.#display_checks();
        this.#display_map();

        this.views.inventory.init(this.plugin.get_inventory());
    }

    #display_checks()
    {
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

    #display_map()
    {
        const map_svg = document.querySelector("#map-svg")
        const maps = this.plugin.get_maps();

        for(const location of maps["lightworld"].locations)
        {
            map_view.draw_location_box(location, map_svg);
        }
    }

    disconnect()
    {
        clearInterval(this.updateTimer);

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
        connect_button.onclick = this.disconnect.bind(this);

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
        this.update_checks(state.checks)
        this.update_map(state.checks)
        this.views.inventory.update(state.inventory);
    }

    update_checks(checks)
    {
        for(var check of checks)
            document.querySelector(`#check-${check.id}-value`).textContent = check.value ? "Yes" : "No";
    }

    update_map(checks)
    {
        const map_svg = document.querySelector("#map-svg")
        const maps = this.plugin.get_maps();

        for(const location of maps["lightworld"].locations)
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

                const location_box = map_svg.querySelector(`#location-box-${location_id}`);
                const rect = location_box.querySelector("rect");
                const text_path = location_box.querySelector("textPath");
                
                if(text_path != null)
                {
                    text_path.textContent = `${check_count}/${location.count}`;
                }

                if(check_count == location.count)
                {
                    rect.setAttribute("fill", "rgba(127, 127, 127, 0.75)")
                }
            }
        }
    }
}
