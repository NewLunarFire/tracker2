import { Usb2Snes } from "./js/usb2snes.js"
import alttp from "./js/alttp/main.js"

const usb2snes = new Usb2Snes()
var updateTimer = null;
var previous_memory = null;

function init_layout()
{
    var inventory_container = document.querySelector("#inventory-container");

    for(var item of alttp.inventory)
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

    var checks_by_map = Object.groupBy(alttp.checks, check => check.map);

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

function disconnect()
{
    clearInterval(updateTimer);

    usb2snes.disconnect()
    const connect_button = document.querySelector("#connect");

    connect_button.textContent = "Connect";
    connect_button.onclick = connect;
}

export async function connect()
{
    await usb2snes.connect();
    const connect_button = document.querySelector("#connect");
    connect_button.textContent = "Disconnect";
    connect_button.onclick = disconnect;

    const device_list = await usb2snes.request_device_list()
    populate_device_list(device_list);
}

export async function attach()
{
    const device = document.querySelector("#device-select").value;
    await usb2snes.attach(device);
    const device_info = await usb2snes.get_device_info();

    document.querySelector("#device-info").textContent = `${device_info.name} ${device_info.version} running ${device_info.file}`
    await update();

    updateTimer = setInterval(update, 5000);
}

export async function update()
{
    await update_inventory();
    await update_checks();
}

async function update_inventory()
{
    const memory = await usb2snes.read_memory("F5F340", 128);

    for(var item of alttp.inventory)
    {
        const span = document.querySelector(`#inventory-${item.id}-value`);
        const value = memory[item.offset]

        if(item.type == "state")
            span.textContent = item.states[value];
        else if(item.type == "boolean")
            span.textContent = (value != 0 ? "Yes" : "No");
        else if(item.type == "count")
            span.textContent = value;
    }
}

async function update_checks()
{
    const memory = await read_sram();

    for(var check of alttp.checks)
    {
        var flag = check_flag(memory, check.offset, check.bit);
        console.log({name: check.name, value: flag});

        document.querySelector(`#check-${check.id}-value`).textContent = flag ? "Yes" : "No";
    }

    if(previous_memory != null)
        compare_sram(previous_memory, memory);

    previous_memory = memory;
}

function compare_sram(prev, cur)
{
    var message = "SRAM updates:\n";

    for(var i = 0; i < prev.length; i++)
    {
        var previous = prev[i];
        var current = cur[i];

        // Ignore inventory updates
        if(i >= 832 && i <= 907)
        {
            continue;
        }

        // Remove addresses that always change
        if(i == 1070 || i == 1071 || i == 1084 || i == 1086 || i == 1087)
        {
            continue;
        }

        if(previous != current)
        {
            message += `${hex(i, 3)}: ${hex(previous, 2)} -> ${hex(current, 2)}\n`
        }
    }

    console.log(message);
}

function hex(input, len)
{
    return Number(input).toString(16).toUpperCase().padStart(len, '0');
}

function check_flag(memory, offset, bit)
{
    return (memory[offset] & (1 << bit)) != 0;
}

async function read_sram()
{
    var hexstr = "";

    for(var i = 0; i < 10; i++)
    {
        var offset = i * 128;
        var addr = "F5F" + Number(offset).toString(16).toUpperCase().padStart(3, '0');

        const data = await usb2snes.read_memory(addr, 128);
        hexstr += data.toHex();
    }

    return Uint8Array.fromHex(hexstr);
}

function populate_device_list(device_list)
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

export default { connect, attach, update, init_layout }
