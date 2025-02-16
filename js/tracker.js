import { ChecksView } from "./views/checks.js";
import { InventoryView } from "./views/inventory.js"
import { MapView } from "./views/map.js"
import InventoryState from "./state/inventory.js";
import CheckStore from "./state/checks.js";
import LogicController from "./logic.js";

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
        this.stores = {
            checks: new CheckStore(),
            inventory: new InventoryState()
        }
        this.views = {
            inventory: new InventoryView(document.querySelector("#inventory-container"), this.stores.inventory),
            map: new MapView(document.querySelector("#map-svg")),
            checks: new ChecksView(document.querySelector("#checks-container"), this.stores.checks)
        }
        this.logic = new LogicController(this.stores.checks, this.stores.inventory);
    }

    init_layout()
    {
        const maps = this.plugin.get_maps();
        
        this.views.checks.init(maps);
        this.views.map.init(maps);

        for(var check of this.plugin.get_checks())
            this.stores.checks.add_check(check);

        for(var item of this.plugin.get_inventory())
            this.stores.inventory.add_item(item);

        for(var resource of this.plugin.get_resources())
            this.stores.inventory.add_resource(resource);
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
        const state = await this.plugin.read_state();

        this.views.map.update(state.checks);

        for(var item of state.inventory)
            this.stores.inventory.set_state(item.id, item.value);

        for(var resource of state.resources)
            this.stores.inventory.update_resource_count(resource.id, resource.count);

        for(let check of state.checks)
            this.stores.checks.set_is_checked(check.id, check.value);
    }
}
