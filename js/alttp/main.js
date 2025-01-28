import checks from "./checks.js"

const inventory = [
    {
        id: "bow",
        name: "Bow",
        type: "state",
        states: ["None", "Bow", "Bow & Arrow", "Silver Arrow Bow", "Bow & Silver Arrows"],
        offset: 0, 
    },
    {
        id: "boomerang",
        name: "Boomerang",
        type: "state",
        states: ["None", "Blue", "Red"],
        offset: 1, 
    },
    {
        id: "hookshot",
        name: "Hookshot",
        type: "boolean",
        offset: 2, 
    },
    {
        id: "bombs",
        name: "Bombs",
        type: "count",
        offset: 3, 
    },
    {
        id: "magic-powder",
        name: "Magic Powder",
        type: "state",
        states: ["None", "Mushroom", "Magic Powder"],
        offset: 4, 
    }
]

export default { inventory, checks };