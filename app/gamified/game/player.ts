import * as Phaser from "phaser";

const TILE_SIZE = 32;
const MAP_WIDTH = 75;  // tiles
const MAP_HEIGHT = 50; // tiles

const WORLD_WIDTH = MAP_WIDTH * TILE_SIZE;
const WORLD_HEIGHT = MAP_HEIGHT * TILE_SIZE;

export default class MainScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private book!: Phaser.Physics.Arcade.Sprite;
    private gem!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd!: {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
    };
    private interactKey!: Phaser.Input.Keyboard.Key;

    private spawnEgg(x: number, y: number) {
        const egg = this.physics.add.staticSprite(x, y, "player");
        egg.setTint(0xf472b6); // pink

        this.physics.add.overlap(this.player, egg, () => {
            window.dispatchEvent(new Event("collect-egg"));
            egg.destroy();
        });
    }

    constructor() {
        super("MainScene");
    }

    preload() {
        this.load.image("tiles", "/tiles/ground.png");

        // temporary player texture
        this.textures.generate("player", {
            data: ["1"],
            pixelWidth: TILE_SIZE,
        });
    }

    create() {
        this.interactKey = this.input.keyboard!.addKey(
            Phaser.Input.Keyboard.KeyCodes.E
        );

        // --- MAP ---
        const map = this.make.tilemap({
            tileWidth: TILE_SIZE,
            tileHeight: TILE_SIZE,
            width: MAP_WIDTH,
            height: MAP_HEIGHT,
        });

        const tileset = map.addTilesetImage("tiles");

        const ground = map.createBlankLayer(
            "ground",
            tileset!,
            0,
            0
        );

        // Fill map with tile index 0
        ground!.fill(0);

        // --- WORLD BOUNDS ---
        this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

        // --- SPAWN EGGS ---
        this.spawnEgg(300, 300);
        this.spawnEgg(800, 600);
        this.spawnEgg(1600, 400);

        // --- PLAYER ---
        this.player = this.physics.add.sprite(
            WORLD_WIDTH / 2,
            WORLD_HEIGHT / 2,
            "player"
        );

        this.player.setTint(0x22c55e);
        this.player.setCollideWorldBounds(true);

        // --- BOOK OBJECT ---
        const book = this.physics.add.staticSprite(
            WORLD_WIDTH / 2 + 100,
            WORLD_HEIGHT / 2,
            "player" // placeholder square
        );

        book.setTint(0xfacc15); // yellow

        // --- PICKUP ITEM ---
        const gem = this.physics.add.staticSprite(
            WORLD_WIDTH / 2 - 120,
            WORLD_HEIGHT / 2,
            "player"
        );

        gem.setTint(0x38bdf8); // blue


        // --- INPUT ---
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.wasd = this.input.keyboard!.addKeys("W,A,S,D") as any;

        // --- CAMERA ---
        this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.roundPixels = true;
    }

    update() {
        // MOVEMENT
        const speed = 200;
        let vx = 0;
        let vy = 0;

        if (this.cursors.left?.isDown || this.wasd.A.isDown) vx = -speed;
        if (this.cursors.right?.isDown || this.wasd.D.isDown) vx = speed;
        if (this.cursors.up?.isDown || this.wasd.W.isDown) vy = -speed;
        if (this.cursors.down?.isDown || this.wasd.S.isDown) vy = speed;

        this.player.setVelocity(vx, vy);
        this.player.body!.velocity.normalize().scale(speed);

        // INTERACT
        const distance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            this.book.x,
            this.book.y
        );

        if (distance < 40 && Phaser.Input.Keyboard.JustDown(this.interactKey)) {
            window.dispatchEvent(new Event("open-book"));
        }

        // PICKUP GEM
        const pickupDistance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            this.gem.x,
            this.gem.y
        );

        if (pickupDistance < 30) {
            window.dispatchEvent(
                new CustomEvent("pickup-item", { detail: "Gem" })
            );

            this.gem.destroy();
        }
    }
}
