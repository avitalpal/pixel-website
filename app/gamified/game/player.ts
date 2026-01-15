import * as Phaser from "phaser";

const TILE_SIZE = 32;
const MAP_WIDTH = 75;
const MAP_HEIGHT = 50;

const WORLD_WIDTH = MAP_WIDTH * TILE_SIZE;
const WORLD_HEIGHT = MAP_HEIGHT * TILE_SIZE;

export default class MainScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private book!: Phaser.Physics.Arcade.Sprite;
    private gem!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd!: any;
    private interactKey!: Phaser.Input.Keyboard.Key;

    constructor() {
        super("MainScene");
    }

    preload() {
        // Load your ground tile
        this.load.image("ground", "/tiles/ground.png");

        // Generate a simple square texture for player / items
        this.textures.generate("player", { data: ["1111", "1111", "1111", "1111"], pixelWidth: 8 });
        
        this.load.on('loaderror', (file: any) => {
            console.error('Error loading:', file.key, file.url);
        });
    }

    create() {
        this.interactKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // --- FILL BACKGROUND WITH TILES ---
        for (let y = 0; y < MAP_HEIGHT; y++) {
            for (let x = 0; x < MAP_WIDTH; x++) {
                this.add.image(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, "ground");
            }
        }

        // --- WORLD BOUNDS ---
        this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

        // --- PLAYER ---
        this.player = this.physics.add.sprite(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, "player");
        this.player.setTint(0x22c55e);
        this.player.setCollideWorldBounds(true);

        // --- BOOK ---
        this.book = this.physics.add.sprite(WORLD_WIDTH / 2 + 100, WORLD_HEIGHT / 2, "player");
        this.book.setTint(0xfacc15);
        this.book.setImmovable(true);

        // --- GEM ---
        this.gem = this.physics.add.sprite(WORLD_WIDTH / 2 - 120, WORLD_HEIGHT / 2, "player");
        this.gem.setTint(0x38bdf8);
        this.gem.setImmovable(true);

        // --- EGGS ---
        this.spawnEgg(300, 300);
        this.spawnEgg(800, 600);
        this.spawnEgg(1600, 400);

        // --- INPUT ---
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.wasd = this.input.keyboard!.addKeys("W,A,S,D");

        // --- CAMERA ---
        this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }

    private spawnEgg(x: number, y: number) {
        const egg = this.physics.add.sprite(x, y, "player");
        egg.setTint(0xf472b6);
        egg.setImmovable(true);

        this.physics.add.overlap(this.player, egg, () => {
            window.dispatchEvent(new Event("collect-egg"));
            egg.destroy();
        });
    }

    update() {
        const speed = 200;
        let vx = 0;
        let vy = 0;

        if (this.cursors.left.isDown || this.wasd.A.isDown) vx = -speed;
        if (this.cursors.right.isDown || this.wasd.D.isDown) vx = speed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vy = -speed;
        if (this.cursors.down.isDown || this.wasd.S.isDown) vy = speed;

        this.player.setVelocity(vx, vy);
        this.player.body!.velocity.normalize().scale(speed);

        // INTERACT BOOK
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.book.x, this.book.y);
        if (distance < 40 && Phaser.Input.Keyboard.JustDown(this.interactKey)) {
            window.dispatchEvent(new Event("open-book"));
        }

        // PICKUP GEM
        const pickupDistance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.gem.x, this.gem.y);
        if (pickupDistance < 30) {
            window.dispatchEvent(new CustomEvent("pickup-item", { detail: "Gem" }));
            this.gem.destroy();
        }
    }
}
