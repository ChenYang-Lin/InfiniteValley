import MainScene from "./MainScene.js"

const config = {
    width: 1920 / 2,
    height: 1080 / 2,
    backgroundColor: "#999999",
    type: Phaser.AUTO,
    parent: "infinite-valley",
    scene: [MainScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    pixelArt: true,
    physics: {
        default: "matter",
        matter: {
            debug: true,
            gravity: {y: 0},
        }
    },
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin.default,
                key: "matterCollision",
                mapping: "matterCollision",
            }
        ]
    },
    disableContentMenu: true,
}

new Phaser.Game(config);
