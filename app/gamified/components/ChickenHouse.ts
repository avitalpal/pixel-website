import * as Phaser from "phaser";

export default class ChickenHouse extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "chicken-house", 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // --- Rendering ---
        this.setOrigin(0.5, 1); // anchor at bottom (important!)
        this.setDepth(this.y);
        this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);

        // --- Physics ---
        const body = this.body as Phaser.Physics.Arcade.Body;

        // Taller + higher collision box
        const hitboxWidth = this.width * 0.8;
        const hitboxHeight = this.height;

        body.setSize(hitboxWidth, hitboxHeight);

        // Move hitbox UP (still at the base, but not too low)
        body.setOffset(
            (this.width - hitboxWidth) / 2,  // center horizontally
            this.height - hitboxHeight - 4   // raise it slightly
        );

        body.setImmovable(true);
        body.setAllowGravity(false);
    }
}
