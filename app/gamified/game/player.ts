import * as Phaser from "phaser";

const TILE_SIZE = 32;

type Journal = {
    id: string;
    sprite: Phaser.Physics.Arcade.Sprite;
    indicator: Phaser.GameObjects.Image;
    opened: boolean;
};


export default class MainScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd!: any;
    private interactKey!: Phaser.Input.Keyboard.Key;

    private journals: Journal[] = [];
    private gems: Phaser.Physics.Arcade.Sprite[] = [];

    private currentAnim: string = "";

    // At the top of your MainScene class:
    private isModalOpen: boolean = false;

    constructor() {
        super("MainScene");
    }

    preload() {
        // Characters
        this.load.spritesheet(
            "player",
            "/characters/Basic-Charakter-Spritesheet.png",
            {
                frameWidth: 48,
                frameHeight: 48
            }
        );

        // Objects
        this.load.image(
            "egg",
            "/objects/Egg_item.png"
        );

        this.load.image(
            "chest",
            "/objects/Chest.png"
        );

        // Tilesets
        this.load.image(
            "grassTiles",
            "/tilesets/Grass.png"
        );

        this.load.image(
            "waterTiles",
            "/tilesets/Water.png"
        );

        this.load.image("keyE", "/fonts/E.png");

        // Tilemap
        this.load.tilemapTiledJSON("gameMap", "/maps/gameMap3.json");

        // Tilesets
        this.load.image("Grass", "/tilesets/Grass.png");
        this.load.image("Fences", "/tilesets/Fences.png");
        this.load.image("Hills", "/tilesets/Hills.png");
        this.load.image("Wooden House", "/tilesets/Wooden House.png");
        this.load.image("Wooden_House_Walls_Tilset", "/tilesets/Wooden_House_Walls_Tilset.png");
        this.load.image("Tilled_Dirt", "/tilesets/Tilled_Dirt.png");
        this.load.image("Tilled Dirt", "/tilesets/Tilled Dirt.png");

    }

    create() {
        this.interactKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        window.addEventListener("modal-open", () => {
            this.isModalOpen = true;
        });
        window.addEventListener("modal-close", () => {
            this.isModalOpen = false;
        });

        const map = this.make.tilemap({ key: "gameMap" });

        const worldWidth = map.widthInPixels;
        const worldHeight = map.heightInPixels;


        // Add tilesets
        const grassTiles = map.addTilesetImage("Grass", "Grass");
        if (!grassTiles) throw new Error("Tileset 'Grass' not found! Check your Tiled tileset name");
        const fencesTiles = map.addTilesetImage("Fences", "Fences");
        if (!fencesTiles) throw new Error("Tileset 'Fences' not found! Check your Tiled tileset name");
        const hillsTiles = map.addTilesetImage("Hills", "Hills");
        if (!hillsTiles) throw new Error("Tileset 'Hills' not found! Check your Tiled tileset name");
        const woodenHouseTiles = map.addTilesetImage("Wooden House", "Wooden House");
        if (!woodenHouseTiles) throw new Error("Tileset 'Wooden House' not found! Check your Tiled tileset name");
        const woodenWallsTiles = map.addTilesetImage("Wooden_House_Walls_Tilset", "Wooden_House_Walls_Tilset");
        if (!woodenWallsTiles) throw new Error("Tileset 'Wooden_House_Walls_Tilset' not found! Check your Tiled tileset name");
        const tilledDirtTiles = map.addTilesetImage("Tilled_Dirt", "Tilled_Dirt");
        if (!tilledDirtTiles) throw new Error("Tileset 'Tilled_Dirt' not found! Check your Tiled tileset name");
        const tilledDirt2Tiles = map.addTilesetImage("Tilled Dirt", "Tilled Dirt");
        if (!tilledDirt2Tiles) throw new Error("Tileset 'Tilled Dirt' not found! Check your Tiled tileset name");

        const tilesList = [
            grassTiles,
            fencesTiles,
            hillsTiles,
            woodenHouseTiles,
            woodenWallsTiles,
            tilledDirtTiles,
            tilledDirt2Tiles
        ];

        // Create layers
        const baseLayer = map.createLayer("Base_ground", tilesList, 0, 0);
        const groundDetails = map.createLayer("Ground_details", tilesList, 0, 0);
        const boundariesLayer = map.createLayer("Boundaries_terrain", tilesList, 0, 0);

        // [baseLayer, groundDetails, boundariesLayer].forEach(layer => {
        //     layer!.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
        // });

        // Optional: adjust rendering order
        baseLayer!.setDepth(0);
        groundDetails!.setDepth(0);
        boundariesLayer!.setDepth(2);

        // COLLISION
        boundariesLayer!.setCollisionByProperty({ collides: true });

        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

        // --- Player ---
        this.player = this.physics.add.sprite(
            worldWidth / 2,
            worldHeight / 2,
            "player",
            0 // frame index
        );
        this.player.setDepth(3);

        // Resize the collision box to be smaller than the sprite
        this.player.body!.setSize(16, 16);

        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, boundariesLayer!);

        this.player.setOrigin(0.5, 0.5);

        this.textures.get("player").setFilter(Phaser.Textures.FilterMode.NEAREST);

        // --- Corrected Animations ---
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: "walk-down",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "walk-up",
            frames: this.anims.generateFrameNumbers("player", { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "walk-left",
            frames: this.anims.generateFrameNumbers("player", { start: 8, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "walk-right",
            frames: this.anims.generateFrameNumbers("player", { start: 12, end: 15 }),
            frameRate: 8,
            repeat: -1
        });
        // Celebration animation (just frame 3, repeated quickly)
        this.anims.create({
            key: "celebrate",
            frames: this.anims.generateFrameNumbers("player", { frames: [3] }),
            frameRate: 1,
            repeat: 0
        });


        // --- Gems ---
        const gemPositions = [
            { x: worldWidth / 2 - 120, y: worldHeight / 2, name: "Gem A" },
            { x: worldWidth / 2 + 200, y: worldHeight / 2 - 100, name: "Gem B" },
        ];

        gemPositions.forEach((pos) => {
            const gem = this.physics.add.sprite(pos.x, pos.y, "egg");
            gem.setTint(0x38bdf8);
            gem.setImmovable(true);
            gem.setDepth(2);
            (gem as any).itemName = pos.name;

            this.gems.push(gem);

            this.physics.add.overlap(this.player, gem, (player, gem) => {
                window.dispatchEvent(
                    new CustomEvent("pickup-item", { detail: (gem as any).itemName })


                );
                gem.destroy();
            });
        });


        // --- Journals ---
        const positions = [
            { id: "j1", x: worldWidth / 2 + 100, y: worldHeight / 2 },
            { id: "j2", x: worldWidth / 2 + 300, y: worldHeight / 2 + 50 },
            { id: "j3", x: worldWidth / 2 - 200, y: worldHeight / 2 - 100 },
            { id: "j4", x: worldWidth / 2 - 300, y: worldHeight / 2 + 200 },
        ];

        positions.forEach((j) => {
            const sprite = this.physics.add.sprite(j.x, j.y, "chest");
            sprite.setTint(0xfacc15);
            sprite.setImmovable(true);
            sprite.setDepth(2);

            const indicator = this.add
                .image(j.x, j.y - 24, "keyE")
                .setOrigin(0.5)
                .setVisible(false)
                .setDepth(2)
            this.textures.get("keyE").setFilter(
                Phaser.Textures.FilterMode.NEAREST
            );

            this.tweens.add({
                targets: indicator,
                y: indicator.y - 6,   // how high it bounces
                duration: 600,
                yoyo: true,
                repeat: -1,
                ease: "Sine.easeInOut"
            });

            this.journals.push({
                id: j.id,
                sprite,
                indicator,
                opened: false,
            });
        });

        this.textures.get("chest").setFilter(Phaser.Textures.FilterMode.NEAREST);

        // --- Eggs ---
        this.spawnEgg(300, 300);
        this.spawnEgg(800, 600);
        this.spawnEgg(1600, 400);

        this.textures.get("egg").setFilter(Phaser.Textures.FilterMode.NEAREST);

        // --- Input ---
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.wasd = this.input.keyboard!.addKeys("W,A,S,D");

        // --- Camera ---
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(3); // <-- THIS replaces layer scaling

    }

    private spawnEgg(x: number, y: number) {
        const egg = this.physics.add.sprite(x, y, "egg");
        egg.setTint(0xf472b6);
        egg.setImmovable(true);
        egg.setDepth(2);

        this.physics.add.overlap(this.player, egg, () => {
            window.dispatchEvent(new Event("collect-egg"));
            egg.destroy();

            // Play celebration animation
            this.player.play("celebrate", true);

            // Jump up and down with a tween
            this.tweens.add({
                targets: this.player,
                y: this.player.y - 20,       // jump height
                yoyo: true,
                duration: 200,               // time up and down
                ease: 'Power1',
                onComplete: () => {
                    // Return to idle or current walking direction after celebration
                    this.currentAnim = "";
                }
            });
        });
    }

    update() {
        if (this.isModalOpen) {
            this.player.setVelocity(0, 0);
            this.player.play("idle", true); // Ensure idle plays when modal is open
            return;
        }

        const speed = 150;
        let vx = 0, vy = 0;

        // 1. Determine Movement
        if (this.cursors.left.isDown || this.wasd.A.isDown) vx = -speed;
        else if (this.cursors.right.isDown || this.wasd.D.isDown) vx = speed;

        if (this.cursors.up.isDown || this.wasd.W.isDown) vy = -speed;
        else if (this.cursors.down.isDown || this.wasd.S.isDown) vy = speed;

        this.player.setVelocity(vx, vy);
        this.player.body!.velocity.normalize().scale(speed);

        // 2. Determine Animation (The "Blink" Killer)
        let animToPlay = "idle"; // Default to idle

        if (vx < 0) animToPlay = "walk-left";
        else if (vx > 0) animToPlay = "walk-right";
        else if (vy < 0) animToPlay = "walk-up";
        else if (vy > 0) animToPlay = "walk-down";
        // If none of the above are true, it stays "idle"

        // 3. Play Animation only if it changed
        if (this.currentAnim !== animToPlay) {
            this.player.play(animToPlay, true);
            this.currentAnim = animToPlay;
        }

        // Check journal interaction
        this.journals.forEach((j) => {
            const d = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                j.sprite.x,
                j.sprite.y
            );

            j.indicator.setVisible(d < 30);

            if (d < 30 && Phaser.Input.Keyboard.JustDown(this.interactKey)) {
                window.dispatchEvent(
                    new CustomEvent("open-journal", { detail: { id: j.id } })
                );
                j.opened = true;
            }
        });

    }
}
