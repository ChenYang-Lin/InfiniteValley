import AnimaitonCOntroller from "./AnimationController.js";
import InputController from "./InputController.js";

export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super(scene.matter.world, x, y, texture, frame) 


        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.circle(this.x, this.y, 10, { isSensor: false, label: "playerCollider" });
        let playerSensor = Bodies.circle(this.x, this.y, 34, { isSensor: true, label: "playerSensor" });
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0,
        })
        this.setExistingBody(compoundBody).setFixedRotation();
        this.scene.add.existing(this);

        this.touching = [];
        this.givenPath = [];
        this.givenDestination;

        this.movementKeysPressing = [];
        this.directions = { up: "up", right: "right", down: "down", left: "left" };
        this.direction = this.directions.up;
        
        this.is_attacking = false;

        
        this.inputController = new InputController({ scene: this.scene, player: this });
        this.animationController = new AnimaitonCOntroller({ scene: this.scene, player: this })

        // this.createMiningCollisions(playerSensor);
        // this.createPickupCollisions(playerCollider);
        // this.createSeeThroughCollisions(playerCollider);

        
    }

    static preload(scene) {
        scene.load.atlas("player", "assets/img/player.png", "assets/atlas/player_atlas.json");
        scene.load.animation("player_anim", "assets/anim/player_anim.json");
    }

    create() {

    }

    get velocity() {
        return this.body.velocity;
    }

    update() {
        this.depth = this.y;

        this.inputController.update();


        this.updatePlayerMovement();
        this.updatePlayerDirection();

    }

    updatePlayerMovement() {
        const speed = 1.5;
        this.setVelocity(0,0);
        
        let playerVelocity = new Phaser.Math.Vector2();

        if (this.movementKeysPressing.includes(this.directions.up)) {
            playerVelocity.y -= 1;
        }
        if (this.movementKeysPressing.includes(this.directions.right)) {
            playerVelocity.x += 1;
        }
        if (this.movementKeysPressing.includes(this.directions.down)) {
            playerVelocity.y += 1;
        }
        if (this.movementKeysPressing.includes(this.directions.left)) {
            playerVelocity.x -= 1;
        }
        
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);

        if (Math.abs(this.velocity.x) > 0 || Math.abs(this.velocity.y) > 0) {
            this.anims.play(`walk_${this.direction}`, true);
        } else {
            this.anims.play(`idle_${this.direction}`, true);
        }

        // console.log(this.movementKeysPressing)
    }

    updatePlayerDirection() {
        if (Math.abs(this.velocity.x) < Math.abs(this.velocity.y)) {
            if (this.velocity.y > 0)
                this.direction = this.directions.down;
            if (this.velocity.y < 0) 
                this.direction = this.directions.up;
        } else {
            if (this.velocity.x > 0) 
                this.direction = this.directions.right;
            if (this.velocity.x < 0) 
                this.direction = this.directions.left;
        }

        // console.log(this.direction);
    }

    attack() {
        console.log("attacked")
    }

}