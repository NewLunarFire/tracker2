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
        id: "link-house",
        name: "Link's House",
        offset: 520,
        bit: 4
    },
    {
        id: "uncle",
        name: "Link's Uncle",
        offset: 966,
        bit: 0
    },
    {
        id: "secret-passage",
        name: "Secret Passage",
        offset: 909,
        bit: 1
    },
]

/*
const link_house = 32*16 + 8; // 520
const link_house_room = 260;
const link_house_bit = 4;

const link_uncle = "3C6";
const link_uncle_bit = 0;

const secret_passage = "38D";
const secret_passage_bit = 1;
*/

export default { inventory, checks };