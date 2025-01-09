class Property {
    constructor(property) {
        this.property = property;
    }
    
}


let tiles = []
for (let i = 0; i < window.properties.length; i++) {
    const tile = new Property(window.properties[0]);
    tiles.push(tile);
}
