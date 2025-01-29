export class Usb2Snes {
    constructor() {
        this.url = "ws://localhost:8080";
        this.log_events = false;
    }

    connect()
    {
        const that = this;
        return new Promise((resolve, reject) => {
            const ws = that.ws = new WebSocket("ws://localhost:8080");
            ws.binaryType = "arraybuffer";
            ws.onmessage = (event) => {
                this.log("Received from websocket", event);
        
                if(that.next_handler != null)
                    that.next_handler(event);
                
                that.next_handler = null;       
            };

            ws.onopen = (event) => {
                that.log("WS Open", event);
                resolve(event);
            }
        })
        
    }

    disconnect() {
        if(this.ws != null)
        {
            this.ws.close();
            this.ws = null;
        }
    
        if(this.updateTimer != null)
        {
            clearInterval(this.updateTimer);
        }
    }
    
    log()
    {
        if(this.log_events)
            console.log(arguments)
    }

    request_device_list()
    {
        return this.ws_send_promise({
            "Opcode" : "DeviceList",
            "Space" : "SNES"
        }).then((event) => JSON.parse(event.data).Results);
    }

    attach(device)
    {
        // Attach to device
        this.ws_send({
            "Opcode":"Attach",
            "Space":"SNES",
            "Operands":[device]
        });

        // Send name
        this.ws_send({
            "Opcode":"Name",
            "Space":"SNES",
            "Operands":["tracker2"]
        });

        
    }

    async get_device_info()
    {
        // Ask for info
        const event = await this.ws_send_promise({
            "Opcode":"Info",
            "Space":"SNES",
        });

        const result = JSON.parse(event.data).Results;
        return {
            "version": result[0],
            "name": result[1],
            "file": result[2],
            "capabilities": result.slice(3)
        };
    }

    async read_memory(location, size)
    {    
        const event = await this.ws_send_promise({
            "Opcode":"GetAddress",
            "Space":"SNES",
            "Operands":[location,size.toString(16).toUpperCase()]
        });
        
        return new Uint8Array(event.data);
    }

    ws_send(command, handler = null)
    {
        var text = command;
        this.log("Sending to websocket", command);
        if (typeof(command) == "object")
            text = JSON.stringify(command);
        
        if (handler != null)
            this.next_handler = handler;

        this.ws.send(text);
    }

    ws_send_promise(command)
    {
        return new Promise((resolve, reject) => this.ws_send(command, resolve));
    }
}
