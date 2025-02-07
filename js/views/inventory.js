export class InventoryView {
    constructor(container_node)
    {
        this.container_node = container_node;
    }

    init(inventory)
    {
        this.inventory = Object.assign({}, ...inventory.map((x) => ({[x.id]: x})));
        for(var item of inventory)
            this.#add_sprite(item);
    }

    update(inventory_state)
    {
        for(var item of inventory_state)
        {
            const img = document.querySelector(`#inventory-sprite-${item.id}`);
            const inventory_item = this.inventory[item.id];

            if(img == null || inventory_item == null)
                continue;

            if(inventory_item.sprite == null && inventory_item.sprites == null)
                continue;

            if(item.type == "boolean")
            {
                this.#update_title(img, inventory_item, item.value);
                this.#update_sprite(img, inventory_item.sprite, !item.value);
            }
            else if(item.type == "state")
            {
                this.#update_title(img, inventory_item, item.value);
                this.#update_sprite(img, inventory_item.sprites[item.value]);
            }
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
        img.setAttribute("src", "1x1.png");

        this.#update_title(img, item, false);
        this.#update_sprite(img, sprite, item.type == "boolean" || item.type == "count");

        this.container_node.appendChild(img);
    }

    #update_sprite(img, sprite, shade = false)
    {
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
        else
            title = item.name;

        img.setAttribute("alt", title);
        img.setAttribute("title", title);
    }
}