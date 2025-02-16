export class InventoryView {
    constructor(container_node, store)
    {
        this.container_node = container_node;
        this.resources_container = container_node.querySelector("#inventory-resource-container");
        this.sprite_container = container_node.querySelector("#inventory-sprite-container");
        this.images = {}
        this.resource_divs = {}

        this.store = store;
        this.store.on_item_added(this.#on_item_added.bind(this));
        this.store.on_item_updated(this.#on_item_updated.bind(this));
        this.store.on_resource_added(this.#on_resource_added.bind(this));
        this.store.on_resource_updated(this.#on_resource_updated.bind(this));
    }

    #on_item_added(item)
    {
        const img = this.#add_sprite(item);
        this.sprite_container.appendChild(img);
        this.images[item.id] = img;
    }

    #on_item_updated(item)
    {
        this.#update_item(item);
    }

    #on_resource_added(resource)
    {
        const div = this.#add_resource(resource);   
        this.resources_container.appendChild(div);
        this.resource_divs[resource.id] = div;
    }

    #on_resource_updated(resource)
    {
        const div = this.resource_divs[resource.id];
        div.querySelector("span").textContent = "" + resource.count;
    }

    update(inventory_state)
    {
        inventory_state.forEach((item) => this.#update_item(item));
    }

    #update_item(item)
    {
        const img = this.images[item.id];// document.querySelector(`#inventory-sprite-${item.id}`);
        const inventory_item = this.store.get_item(item.id);

        if(img == null || inventory_item == null)
            return;

        if(inventory_item.sprite == null && inventory_item.sprites == null)
            return;

        if(item.type == "boolean")
        {
            this.#update_title(img, inventory_item, item.state);
            this.#update_sprite(img, inventory_item.sprite, !item.state);
        }
        else if(item.type == "state")
        {
            this.#update_title(img, inventory_item, item.state);
            this.#update_sprite(img, inventory_item.sprites[item.state]);
        }
    }

    #add_sprite(item)
    {
        const sprite = item.sprite != null ? item.sprite : (
            item.sprites != null ? item.sprites[0]: null
        )

        if(sprite == null)
            return;

        const img = document.createElement("img");
        img.id = `inventory-sprite-${item.id}`;
        img.onclick = () => this.store.advance_state(item.id);
        img.setAttribute("src", "1x1.png");

        this.#update_title(img, item);
        this.#update_sprite(img, sprite, item.type == "boolean" || item.type == "count");

        return img;
    }

    #add_resource(resource)
    {
        const div = document.createElement("div");

        const img = document.createElement("img");
        img.id = `resource-sprite-${resource.id}`;
        img.setAttribute("src", "1x1.png");
        this.#update_sprite(img, resource.sprite);

        const span = document.createElement("span");
        span.textContent = "0"

        div.appendChild(img);
        div.appendChild(span);

        return div;
    }

    #update_sprite(img, sprite, shade = false)
    {
        if(sprite == null)
            console.log("update_sprite", {img, sprite, shade});

        img.style.backgroundImage = `url(${sprite.sheet})`;
        img.style.backgroundPositionX = `-${sprite.x}px`;
        img.style.backgroundPositionY = `-${sprite.y}px`;

        img.style.filter = sprite.shade || shade ? "grayscale(.5) opacity(.5)" : "";
    }

    #update_title(img, item, value = 0)
    {
        let title = "";
        if(item.type == "state")
            title = item.states[value];
        else if(item.type == "boolean")
            title = item.name + (!!value ? "": " (Unobtained)");
        
        img.setAttribute("alt", title);
        img.setAttribute("title", title);
    }
}