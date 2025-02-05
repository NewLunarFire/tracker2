export default {
    "lightworld": {
        "displayName": "Light World",
        "locations": [{
            "x": 500,
            "y": 450,
            "name": "Escape",
            "count": 6
        },{
            "x": 41,
            "y": 42,
            "name": "Pedestal",
            "count": 1
        },{
            "x": 120,
            "y": 85,
            "name": "Mushroom",
            "count": 1
        },{
            "x": 190,
            "y": 130,
            "name": "Forest Hideout",
            "count": 1
        },{
            "x": 547,
            "y": 680,
            "name": "Link's House",
            "count": 1,
            "checks": ["link-house"]
        },{
            "x": 595,
            "y": 420,
            "name": "Secret Passage",
            "count": 2,
            "checks": ["link-uncle", "secret-passage"]
        },{
            "x": 25,
            "y": 425,
            "name": "Kakariko Well",
            "count": 5,
            "checks": ["kakariko-well-bottom", "kakariko-well-left", "kakariko-well-middle", "kakariko-well-right", "kakariko-well-top"]
        },{
            "x": 130,
            "y": 410,
            "name": "Blind's Hideout",
            "count": 5,
            "checks": ["blind-hideout-far-left", "blind-hideout-far-right", "blind-hideout-left", "blind-hideout-right", "blind-hideout-top"]
        }]
    }
}
