import { Usb2Snes } from "./js/usb2snes.js"
import alttp from "./js/alttp/main.js"

const usb2snes = new Usb2Snes()
var updateTimer = null;

function disconnect()
{
    clearInterval(updateTimer);

    usb2snes.disconnect()
    const connect_button = document.querySelector("#connect");

    connect_button.innerHTML = "Connect";
    connect_button.onclick = connect;
}

export async function connect()
{
    await usb2snes.connect();
    const connect_button = document.querySelector("#connect");
    connect_button.innerHTML = "Disconnect";
    connect_button.onclick = disconnect;

    const device_list = await usb2snes.request_device_list()
    populate_device_list(device_list);
}

export async function attach()
{
    const device = document.querySelector("#device-select").value;
    await usb2snes.attach(device);
    const device_info = await usb2snes.get_device_info();

    document.querySelector("#device-info").innerHTML = `${device_info.name} ${device_info.version} running ${device_info.file}`
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
        const span = document.querySelector(`#inventory-${item.id}`);
        const value = memory[item.offset]

        if(item.type == "state")
            span.innerHTML = item.states[value];
        else if(item.type == "boolean")
            span.innerHTML = (value != 0 ? "Yes" : "No");
        else if(item.type == "count")
            span.innerHTML = value;
    }
}

async function update_checks()
{
    const memory = await read_sram();

    for(var check of alttp.checks)
    {
        var flag = check_flag(memory, check.offset, check.bit);
        console.log({name: check.name, value: flag});

        document.querySelector(`#check-${check.id}`).innerHTML = flag ? "Yes" : "No";
    }
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
            option.innerHTML = device;
            device_select.options.add(option);
        }

        device_select.disabled = false;
        device_attach_button.disabled = false;
    }
    else
    {
        const option = document.createElement('option');
        option.innerHTML = "No device available";
        device_select.options.add(option);

        device_select.disabled = true;
        device_attach_button.disabled = false;
    }
}

export default { connect, attach, update }
