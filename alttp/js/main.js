import checks from "./checks.js"
import inventory from "./inventory.js";
import maps from "./maps.js"
import logic from "./logic.js"

function hex(input, len)
{
    return Number(input).toString(16).toUpperCase().padStart(len, '0');
}

function check_flag(memory, offset, bit)
{
    return (memory[offset] & (1 << bit)) != 0;
}

export default class Alttp {
    constructor(snes)
    {
        this.snes = snes;
        this.previous_memory = null;
        this.inventory = []
    }
    
    get_checks()
    {
        return checks;
    }

    get_resources()
    {
        return inventory.resources;
    }

    get_inventory()
    {
        return inventory.inventory;
    }

    get_maps()
    {
        return maps;
    }

    async read_sram()
    {
        var hexstr = "";

        for(var i = 0; i < 10; i++)
        {
            var offset = i * 128;
            var addr = "F5F" + Number(offset).toString(16).toUpperCase().padStart(3, '0');

            const data = await this.snes.read_memory(addr, 128);
            hexstr += data.toHex();
        }

        return Uint8Array.fromHex(hexstr);
    }

    compare_sram(prev, cur)
    {
        var message = "SRAM updates:\n";

        for(var i = 0; i < prev.length; i++)
        {
            var previous = prev[i];
            var current = cur[i];

            // Ignore inventory updates
            if(i >= 832 && i <= 907)
                continue;

            // Remove addresses that always change
            if([1070, 1071, 1084, 1086, 1087, 1092, 1093].includes(i))
                continue;
            
            if(previous != current)
            {
                message += `${hex(i, 3)}: ${hex(previous, 2)} -> ${hex(current, 2)}\n`
            }
        }

        console.log(message);
    }

    async read_state()
    {
        const memory = await this.read_sram();
        if(this.previous_memory != null)
            this.compare_sram(this.previous_memory, memory);

        this.previous_memory = memory;

        this.inventory = this.#update_inventory(memory);

        return {
            inventory: this.inventory,
            checks: this.#update_checks(memory),
            resources: this.#update_resources(memory)
        };
    }

    #update_inventory(memory)
    {
        const inventory_state = [];

        for(var item of inventory.inventory)
        {
            const mem_value = memory[item.offset + 0x340]
            let inventory_value = null;

            if(item.type == "state")
                inventory_value = mem_value;
            else if(item.type == "boolean")
                inventory_value = !!mem_value;
            

            inventory_state.push({
                id: item.id,
                type: item.type,
                value: inventory_value
            });
        }

        return inventory_state;
    }

    #update_resources(memory)
    {
        const resources_state = []
        for(var resource of inventory.resources)
        {
            let count = 0;
            if(resource.size == 1)
                count = memory[resource.offset + 0x340];
            else if(resource.size == 2)
                count = (memory[resource.offset + 0x341] << 8) + memory[resource.offset + 0x340]

            resources_state.push({id: resource.id, count});
        }

        return resources_state;
    }

    #update_checks(memory)
    {
        const checks_state = []
        for(var check of checks)
        {
            if(check.offset == null)
                continue;
            
            const flag = check_flag(memory, check.offset, check.bit);
            checks_state.push({
                id: check.id,
                value: flag
            });
        }

        return checks_state;
    }
}
