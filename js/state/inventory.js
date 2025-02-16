export default class InventoryState {
    constructor()
    {
        this.state = {}
        this.resources = {}

        this.add_item_callbacks = [];
        this.add_resource_callbacks = [];
        this.update_item_callbacks = [];
        this.update_resource_callbacks = [];
    }

    add_item(item)
    {
        this.state[item.id] = item;
        if(item.type === "boolean")
            item.state = false;
        else if(item.type === "state")
            item.state = 0;

        for(var callback of this.add_item_callbacks)
            callback(item);
    }

    add_resource(resource)
    {
        this.resources[resource.id] = resource;
        resource.count = 0;

        this.add_resource_callbacks.forEach(callback => callback(resource));
    }

    get_item(id)
    {
        return this.state[id];
    }

    get_items()
    {
        return Object.values(this.state);
    }

    get_resource(id)
    {
        return this.resources[id];
    }

    advance_state(id)
    {
        const item = this.state[id];
        if(item.type == "boolean")
            item.state = !item.state;
        else if(item.type == "state")
        {
            item.state = (item.state + 1) % item.sprites.length;
        }
        
        for(var callback of this.update_item_callbacks)
            callback(item);
    }

    set_state(id, state)
    {
        const item = this.state[id];

        if(item.state === state)
            return;

        item.state = state;
        for(var callback of this.update_item_callbacks)
            callback(item);
    }

    update_resource_count(id, count)
    {
        const resource =  this.resources[id];
        resource.count = count;

        this.update_resource_callbacks.forEach(callback => callback(resource));
    }

    on_item_added(callback)
    {
        this.add_item_callbacks.push(callback);
    }

    on_item_updated(callback)
    {
        this.update_item_callbacks.push(callback);
    }

    on_resource_added(callback)
    {
        this.add_resource_callbacks.push(callback);
    }

    on_resource_updated(callback)
    {
        this.update_resource_callbacks.push(callback);
    }
}