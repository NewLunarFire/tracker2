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

const checks = [
    {
        id: "blind-far-left",
        name: "Blind's Hideout - Far Left",
        offset: 0x23A,
        bit: 7
    },
    {
        id: "blind-far-right",
        name: "Blind's Hideout - Far Right",
        offset: 0x23B,
        bit: 1
    },
    {
        id: "blind-left",
        name: "Blind's Hideout - Left",
        offset: 0x23A,
        bit: 5
    },
    {
        id: "blind-right",
        name: "Blind's Hideout - Right",
        offset: 0x23A,
        bit: 6
    },
    {
        id: "blind-bomb",
        name: "Blind's Hideout - Bomb Wall",
        offset: 0x23A,
        bit: 4
    },
    {
        id: "floodgate-chest",
        name: "Floodgate Chest",
        offset: 0x216,
        bit: 4
    },
    {
        id: "link-house",
        name: "Link's House",
        offset: 0x208,
        bit: 4
    },
    {
        id: "uncle",
        name: "Link's Uncle",
        offset: 0x3C6,
        bit: 0
    },
    {
        id: "sanctuary",
        name: "Sanctuary",
        offset: 0x024,
        bit: 4
    },
    {
        id: "secret-passage",
        name: "Secret Passage",
        offset: 0x38D,
        bit: 1
    },
    {
        id: "sunken-treasure",
        name: "Sunken Treasure",
        offset: 0x2BB,
        bit: 6
    }
]

export default { inventory, checks };