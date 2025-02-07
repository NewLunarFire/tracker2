import sprites from "./sprites.js"

const bottle_states = ["Bottle (Unobtained)", "Mushroom", "Empty", "Red Potion", "Green Potion", "Blue Potion", "Fairy", "Bee", "Good Bee"];
const bottle_sprites = [sprites.shade(sprites.empty_bottle), sprites.mushroom, sprites.empty_bottle, sprites.red_potion, sprites.green_potion, sprites.blue_potion, sprites.fairy_bottle, sprites.bee_bottle, sprites.bee_bottle];

export default [
    {
        id: "bow",
        name: "Bow",
        type: "state",
        states: ["Bow (Unobtained)", "Bow", "Bow & Arrow", "Silver Arrow Bow", "Bow & Silver Arrows"],
        offset: 0,
        sprites: [sprites.shade(sprites.bow), sprites.bow, sprites.bow, sprites.silver_bow, sprites.silver_bow]
    },
    {
        id: "boomerang",
        name: "Boomerang",
        type: "state",
        states: ["None", "Blue Boomerang", "Red Boomerang"],
        offset: 1,
        sprites: [sprites.shade(sprites.blue_boomerang), sprites.blue_boomerang, sprites.red_boomerang]
    },
    {
        id: "hookshot",
        name: "Hookshot",
        type: "boolean",
        offset: 2,
        sprite: sprites.hookshot
    },
    {
        id: "bombs",
        name: "Bombs",
        type: "count",
        offset: 3, 
        sprite: sprites.bombs
    },
    {
        id: "magic-powder",
        name: "Magic Powder",
        type: "state",
        states: ["Mushroom (Unobtained)", "Mushroom", "Magic Powder"],
        offset: 4, 
        sprites: [sprites.shade(sprites.mushroom), sprites.mushroom, sprites.magic_powder]
    },
    {
        id: "fire-rod",
        name: "Fire Rod",
        type: "boolean",
        offset: 5,
        sprite: sprites.fire_rod
    },
    {
        id: "ice-rod",
        name: "Ice Rod",
        type: "boolean",
        offset: 6,
        sprite: sprites.ice_rod 
    },
    {
        id: "bombos-medallion",
        name: "Bombos Medallion",
        type: "boolean",
        offset: 7,
        sprite: sprites.bombos_medallion
    },
    {
        id: "ether-medallion",
        name: "Ether Medallion",
        type: "boolean",
        offset: 8,
        sprite: sprites.ether_medallion
    },
    {
        id: "quake-medallion",
        name: "Quake Medallion",
        type: "boolean",
        offset: 9,
        sprite: sprites.quake_medallion
    },
    {
        id: "lamp",
        name: "Lamp",
        type: "boolean",
        offset: 10,
        sprite: sprites.lamp
    },
    {
        id: "magic-hammer",
        name: "Magic Hammer",
        type: "boolean",
        offset: 11,
        sprite: sprites.magic_hammer
    },
    {
        id: "flute",
        name: "Flute",
        type: "state",
        states: ["Shover (Unobtained)", "Shovel", "Flute", "Flute & Bird"],
        offset: 12,
        sprites: [sprites.shade(sprites.shovel), sprites.shovel, sprites.flute, sprites.flute]
    },
    {
        id: "bug-net",
        name: "Bug Catching Net",
        type: "boolean",
        offset: 13,
        sprite: sprites.bug_net
    },
    {
        id: "book-of-mudora",
        name: "Book of Mudora",
        type: "boolean",
        offset: 14,
        sprite: sprites.book_mudora
    },
    {
        id: "cane-somaria",
        name: "Cane of Somaria",
        type: "boolean",
        offset: 16,
        sprite: sprites.cane_somaria
    },
    {
        id: "cane-byrna",
        name: "Cane of Byrna",
        type: "boolean",
        offset: 17,
        sprite: sprites.cane_byrna
    },
    {
        id: "magic-cape",
        name: "Magic Cape",
        type: "boolean",
        offset: 18,
        sprite: sprites.magic_cape
    },
    {
        id: "magic-mirror",
        name: "Magic Mirror",
        type: "state",
        states: ["Magic Mirror (Unobtained)", "Magic Scroll", "Magic Mirror"],
        offset: 19,
        sprites: [sprites.shade(sprites.magic_mirror), sprites.magic_mirror, sprites.magic_mirror]
    },
    {
        id: "gloves",
        name: "Gloves",
        type: "state",
        states: ["Power Glove (Unobtained)", "Power Glove", "Titan's Mitt"],
        offset: 20,
        sprites: [sprites.shade(sprites.power_gloves), sprites.power_gloves, sprites.titan_mitts]
    },
    {
        id: "pegasus-boots",
        name: "Pegasus Boots",
        type: "boolean",
        offset: 21,
        sprite: sprites.pegasus_boots
    },
    {
        id: "zora-flippers",
        name: "Zora's Flippers",
        type: "boolean",
        offset: 22,
        sprite: sprites.zora_flippers
    },
    {
        id: "moon-pearl",
        name: "Moon Pearl",
        type: "boolean",
        offset: 23,
        sprite: sprites.moon_pearl
    },
    {
        id: "sword",
        name: "Sword",
        type: "state",
        states: ["No Sword", "Fighter's Sword", "Master Sword", "Tempered Sword", "Golden Sword"],
        offset: 25,
        sprites: [sprites.shade(sprites.fighter_sword), sprites.fighter_sword, sprites.master_sword, sprites.tempered_sword, sprites.golden_sword]
    },
    {
        id: "shield",
        name: "Shield",
        type: "state",
        states: ["No Shield", "Blue Shield", "Hero's Shield", "Mirror Shield"],
        offset: 26,
        sprites: [sprites.shade(sprites.blue_shield), sprites.blue_shield, sprites.hero_shield, sprites.hero_shield]
    },
    {
        id: "armor",
        name: "Armor",
        type: "state",
        states: ["Green Mail", "Blue Mail", "Red mail"],
        offset: 27,
        sprites: [sprites.green_mail, sprites.blue_mail, sprites.red_mail] 
    },
    {
        id: "bottle-1",
        name: "Bottle 1",
        type: "state",
        states: bottle_states,
        offset: 28,
        sprites: bottle_sprites

    },
    {
        id: "bottle-2",
        name: "Bottle 2",
        type: "state",
        states: bottle_states,
        offset: 29,
        sprites: bottle_sprites
    },
    {
        id: "bottle-3",
        name: "Bottle 3",
        type: "state",
        states: bottle_states,
        offset: 30,
        sprites: bottle_sprites
    },
    {
        id: "bottle-4",
        name: "Bottle 4",
        type: "state",
        states: bottle_states,
        offset: 31,
        sprites: bottle_sprites
    },
    {
        id: "rupees",
        name: "Rupees",
        type: "rupee-count",
        offset: 34,
        sprite: sprites.rupee
    }
];