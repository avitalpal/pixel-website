import * as Phaser from "phaser";

export default class House extends Phaser.Physics.Arcade.Sprite {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        frame: string
    ) {
        super(scene, x, y, "house", frame);

        scene.add.existing(this);
        scene.physics.add.existing(this, true); // static body

        this.setOrigin(0.5, 1); // bottom-center
        this.setDepth(2);

        const body = this.body as Phaser.Physics.Arcade.StaticBody;

        // Collision only at base of house
        body.setSize(this.width * 0.6, 20);
        body.setOffset(
            this.width * 0.2,
            this.height - 20
        );

        body.updateFromGameObject();
    }
}
