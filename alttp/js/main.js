import checks from "./checks.js"
import inventory from "./inventory.js";
import maps from "./maps.js"

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
    }
    
    get_checks()
    {
        return checks;
    }

    get_inventory()
    {
        return inventory;
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

        return {
            inventory: this.#update_inventory(memory),
            checks: this.#update_checks(memory)
        };
    }

    #update_inventory(memory)
    {
        const inventory_state = [];

        for(var item of inventory)
        {
            const mem_value = memory[item.offset + 0x340]
            let inventory_value = null;

            if(item.type == "state")
                inventory_value = mem_value;
            else if(item.type == "boolean")
                inventory_value = !!mem_value;
            else if(item.type == "count")
                inventory_value = mem_value;
            else if(item.type == "rupee-count")
                inventory_value = (memory[item.offset + 0x341] << 8) + mem_value

            inventory_state.push({
                id: item.id,
                type: item.type,
                value: inventory_value
            });
        }

        return inventory_state;
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
