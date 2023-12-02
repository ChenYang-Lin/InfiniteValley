

export default class InputController {
    constructor(data) {
        let { scene, player } = data;
        this.player = player;
        this.scene = scene;
        

        this.player.inputKeys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.J,
        })
    }

    update() {
        this.playerMovementKeysUpdate();

        if (this.player.inputKeys.attack.isDown) {
            this.player.attack();
        }
    }

    playerMovementKeysUpdate() {
        // Up
        if (this.player.inputKeys.up.isDown && !this.player.movementKeysPressing.includes(this.player.directions.up)) {
            this.player.movementKeysPressing.unshift(this.player.directions.up);
        }
        if (this.player.inputKeys.up.isUp && this.player.movementKeysPressing.includes(this.player.directions.up)) {
            const index = this.player.movementKeysPressing.indexOf(this.player.directions.up);
            this.player.movementKeysPressing.splice(index, 1);
        }
        // Right
        if (this.player.inputKeys.right.isDown && !this.player.movementKeysPressing.includes(this.player.directions.right)) {
            this.player.movementKeysPressing.unshift(this.player.directions.right);
        }
        if (this.player.inputKeys.right.isUp && this.player.movementKeysPressing.includes(this.player.directions.right)) {
            const index = this.player.movementKeysPressing.indexOf(this.player.directions.right);
            this.player.movementKeysPressing.splice(index, 1);
        }
        // Down
        if (this.player.inputKeys.down.isDown && !this.player.movementKeysPressing.includes(this.player.directions.down)) {
            this.player.movementKeysPressing.unshift(this.player.directions.down);
        }
        if (this.player.inputKeys.down.isUp && this.player.movementKeysPressing.includes(this.player.directions.down)) {
            const index = this.player.movementKeysPressing.indexOf(this.player.directions.down);
            this.player.movementKeysPressing.splice(index, 1);
        }
        // Left
        if (this.player.inputKeys.left.isDown && !this.player.movementKeysPressing.includes(this.player.directions.left)) {
            this.player.movementKeysPressing.unshift(this.player.directions.left);
        }
        if (this.player.inputKeys.left.isUp && this.player.movementKeysPressing.includes(this.player.directions.left)) {
            const index = this.player.movementKeysPressing.indexOf(this.player.directions.left);
            this.player.movementKeysPressing.splice(index, 1);
        }

    }
}
