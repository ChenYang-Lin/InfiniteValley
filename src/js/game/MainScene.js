import Player from "./player/Player.js";



export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    preload() {
        Player.preload(this);

        this.load.image("tiles", "assets/img/RPG Nature Tileset.png");
        this.load.tilemapTiledJSON("map", "assets/map/map.json");
    }

    create() {
        this.map = this.make.tilemap({ key: "map" });
        const tileset = this.map.addTilesetImage("RPG Nature Tileset", "tiles", 32, 32);
        const layer1 = this.map.createLayer("Tile Layer 1", tileset, 0, 0);
        // const layer2 = this.map.createLayer("Tile Layer 2", tileset, 0, 0);
        layer1.setCollisionByProperty({ collides: true })
        this.matter.world.convertTilemapLayer(layer1);

        this.player = new Player({ scene: this, x: 150, y: 150, texture: "player", frame: "idle_left" });
        
    }

    update() {
        this.player.update();
        
    }
}