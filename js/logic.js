export default class LogicController {
    constructor(checkStore, inventoryStore)
    {
        this.checkStore = checkStore;
        this.inventoryStore = inventoryStore;

        const self = this;
        this.inventoryStore.on_item_updated(() => self.#update_logic());
    }

    #update_logic()
    {
        for(let check of this.checkStore.get_all_checks())
        {
            const logic = check.logic;
            let in_logic = false;

            if(logic == null)
                continue;

            if(logic.type == "inventory")
            {
                var item = this.inventoryStore.get_item(logic.id);
                if(item.type == "boolean")
                    in_logic = !!item.state;
                if(item.type == "state")
                    in_logic = (item.state === logic.state)
            }
            else
            {
                console.log("Unsupported logic type for " + check.id);
                continue;
            }
            
            this.checkStore.set_in_logic(check.id, in_logic);
        }
    }
}