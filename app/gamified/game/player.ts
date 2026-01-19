import * as Phaser from "phaser";
import House from "../components/House";
import ChickenHouse from "../components/ChickenHouse";
import Cows from "../components/Cow";
import Chickens from "../components/Chicken";

const TILE_SIZE = 32;

type ChestState = "rest" | "hover" | "open" | "closing";

type Journal = {
    id: string;
    sprite: Phaser.Physics.Arcade.Sprite;
    indicator: Phaser.GameObjects.Container;
    opened: boolean;
    state: ChestState;
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

    private handleModalClose = () => {
        this.isModalOpen = false;

        this.journals.forEach(j => {
            if (j.state !== "open") return;

            j.state = "closing";

            this.time.delayedCall(300, () => {
                j.sprite.play("chest-close");

                j.sprite.once(
                    Phaser.Animations.Events.ANIMATION_COMPLETE,
                    () => {
                        j.sprite.play("chest-rest");
                        j.opened = false;
                        j.state = "rest";
                    }
                );
            });
        });
    };


    private createPath = (x: number, y: number, frame: string) => {
        const path = this.add.sprite(x, y, "path", frame);
        path.setDepth(1);
        (path as any).isPath = true;
        return path;
    };

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

        this.load.spritesheet("chest", "/objects/Chest.png", {
            frameWidth: 48,
            frameHeight: 48,
        });

        this.load.image("keyE", "/fonts/E.png");

        // Tilemap
        this.load.tilemapTiledJSON("gameMap", "/maps/gameMap3.json");

        this.load.spritesheet("house", "/premade/premade_buildings_demo.png", {
            frameWidth: 16,   // adjust if needed
            frameHeight: 16,
        });

        this.load.spritesheet("path", "/objects/Paths.png", {
            frameWidth: 16,   // adjust if needed
            frameHeight: 16,
        }
        )

        this.load.image("chicken-house", "/objects/Free_Chicken_House.png");

        // Tilesets
        this.load.image("Grass", "/tilesets/Grass.png");
        this.load.image("Fences", "/tilesets/Fences.png");
        this.load.image("Hills", "/tilesets/Hills.png");
        this.load.image("Wooden House", "/tilesets/Wooden House.png");
        this.load.image("Wooden_House_Walls_Tilset", "/tilesets/Wooden_House_Walls_Tilset.png");
        this.load.image("Tilled_Dirt", "/tilesets/Tilled_Dirt.png");
        this.load.image("Tilled Dirt", "/tilesets/Tilled Dirt.png");

        // Animals
        this.load.spritesheet("chicken", "/characters/Free Chicken Sprites.png", {
            frameWidth: 16,
            frameHeight: 16,
        });

        this.load.spritesheet("cow", "/characters/Free Cow Sprites.png", {
            frameWidth: 32,
            frameHeight: 32,
        });

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
        const tilesList = [
            map.addTilesetImage("Grass", "Grass")!,
            map.addTilesetImage("Fences", "Fences")!,
            map.addTilesetImage("Hills", "Hills")!,
            map.addTilesetImage("Wooden House", "Wooden House")!,
            map.addTilesetImage("Wooden_House_Walls_Tilset", "Wooden_House_Walls_Tilset")!,
            map.addTilesetImage("Tilled_Dirt", "Tilled_Dirt")!,
            map.addTilesetImage("Tilled Dirt", "Tilled Dirt")!,
        ];

        if (tilesList.some(t => !t)) throw new Error("One or more tilesets failed to load");

        // Create layers
        const baseLayer = map.createLayer("Base_ground", tilesList, 0, 0);
        const groundDetails = map.createLayer("Ground_details", tilesList, 0, 0);
        const boundariesLayer = map.createLayer("Boundaries_terrain", tilesList, 0, 0);

        [
            "Grass",
            "Fences",
            "Hills",
            "Wooden House",
            "Wooden_House_Walls_Tilset",
            "Tilled_Dirt",
            "Tilled Dirt"
        ].forEach(key => {
            this.textures.get(key).setFilter(
                Phaser.Textures.FilterMode.NEAREST
            );
        });

        // Optional: adjust rendering order
        baseLayer!.setDepth(0);
        groundDetails!.setDepth(0);
        boundariesLayer!.setDepth(2);

        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

        // --- Player ---
        this.player = this.physics.add.sprite(
            worldWidth / 2 - TILE_SIZE * 1.25,
            worldHeight / 2 + TILE_SIZE,
            "player",
            0 // frame index
        );
        this.player.setDepth(3);

        // Resize the collision box to be smaller than the sprite
        this.player.body!.setSize(16, 16);
        const buffer = TILE_SIZE; // 1 tile
        this.physics.world.setBounds(
            buffer,                   // x
            buffer,                   // y
            worldWidth - 2 * buffer,  // width
            worldHeight - 2 * buffer  // height
        );

        // Enable collideWorldBounds so player stops at these bounds

        boundariesLayer!.setCollisionByExclusion([-1]);

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

        // --- House ---
        const houseTex = this.textures.get("house");

        const pathTex = this.textures.get("path");

        houseTex.add("house-small", 0, 33, 37, 94, 123);
        houseTex.add("house-medium", 0, 161, 29, 158, 131);
        houseTex.add("house-large", 0, 17, 181, 190, 123);

        pathTex.add("path-long", 0, 0, 0, 16, 32);
        pathTex.add("path-short", 0, 0, 8, 16, 16);

        houseTex.setFilter(Phaser.Textures.FilterMode.NEAREST);
        pathTex.setFilter(Phaser.Textures.FilterMode.NEAREST);

        // 3. Spawn them as separate sprites
        const house1 = new House(this, 200, 1000, "house-small");
        this.createPath(220, 1010, "path-short");
        const house2 = new House(this, 650, 250, "house-medium");
        this.createPath(620, 265, "path-long");
        const house3 = new House(this, 1000, 1100, "house-large");
        this.createPath(1000, 1115, "path-long");
        const house4 = new House(this, 130, 600, "house-small");
        this.createPath(145, 615, "path-long");
        const house5 = new House(this, 95, 150, "house-medium");
        this.createPath(65, 165, "path-long");
        const house6 = new House(this, 1150, 80, "house-large");
        this.createPath(1150, 90, "path-short");
        const house7 = new House(this, 620, 1100, "house-medium");
        this.createPath(590, 1115, "path-long");

        // Optional: collide with player
        this.physics.add.collider(this.player, house1);
        this.physics.add.collider(this.player, house2);
        this.physics.add.collider(this.player, house3);
        this.physics.add.collider(this.player, house4);
        this.physics.add.collider(this.player, house5);
        this.physics.add.collider(this.player, house6);
        this.physics.add.collider(this.player, house7);

        // --- Chicken Houses ---
        const chickenCoops = [
            { x: 500, y: 600 },
            { x: 300, y: 500 },
            { x: 900, y: 700 },
            { x: 400, y: 200 },
        ];

        const chickenHouseSprites: Phaser.GameObjects.GameObject[] = [];

        for (const coop of chickenCoops) {
            const chickenHouse = new ChickenHouse(this, coop.x, coop.y);
            this.physics.add.collider(this.player, chickenHouse);

            // push the actual sprite to the array
            chickenHouseSprites.push(chickenHouse);
        }

        this.player.setDepth(this.player.y);

        // --- Animals ---
        
        const collidables: (Phaser.Tilemaps.TilemapLayer | Phaser.GameObjects.GameObject)[] = [
            boundariesLayer!,          // tile collision
            house1, house2, house3, house4, house5, house6, house7,
            ...chickenHouseSprites     // actual GameObjects, not `{x,y}`
        ];

        // Spawn cows
        new Cows(this, 12, collidables); // spawn cows randomly
        // Spawn chickens
        new Chickens(this, 20, collidables); // spawn chickens randomly

        // --- Gems ---
        const gemPositions = [
            { x: worldWidth / 2 - 120, y: worldHeight / 2, name: "Gem A" },
            { x: worldWidth / 2 + 200, y: worldHeight / 2 - 100, name: "Gem B" },
        ];

        gemPositions.forEach((pos) => {
            const gem = this.physics.add.sprite(pos.x, pos.y, "egg");
            gem.setTint(0x38bdf8);
            gem.setImmovable(true);
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
        // Chest idle (resting) frame
        this.anims.create({
            key: "chest-rest",
            frames: [{ key: "chest", frame: 1 }],
        });

        const positions = [
            { id: "hj1", x: 184, y: 1000 },  // house1
            { id: "hj2", x: 642, y: 250 },   // house2
            { id: "hj3", x: 1050, y: 1100 }, // house3
            { id: "hj4", x: 114, y: 600 },   // house4
            { id: "hj5", x: 88, y: 150 },    // house5
            { id: "hj6", x: 1100, y: 80 },  // house6
            { id: "hj7", x: 612, y: 1100 },  // house7
        ];

        this.textures.get("keyE").setFilter(Phaser.Textures.FilterMode.NEAREST);

        positions.forEach((j) => {
            const sprite = this.physics.add.sprite(j.x, j.y, "chest");
            sprite.setImmovable(true);
            sprite.setTint(0xfacc15);
            sprite.play("chest-rest");

            // 1. Create the Background (Rectangle)
            const bgW = 15; // Width of background
            const bgH = 15; // Height of background
            const bg = this.add.graphics();
            bg.fillStyle(0x000000, 0.7); // Black color, 70% opacity
            bg.fillRoundedRect(-bgW / 2, -bgH / 2, bgW, bgH, 4); // Centered rectangle

            // 2. Create the Key Image
            const keyImg = this.add.image(0, 0, "keyE").setOrigin(0.5);

            // 3. Put them in a Container
            // Position the container where the indicator used to be (j.y - 24)
            const indicatorContainer = this.add.container(j.x, j.y - 16, [bg, keyImg]);
            indicatorContainer.setVisible(false);
            indicatorContainer.setDepth(10000); // Keep it above everything

            this.journals.push({
                id: j.id,
                sprite,
                indicator: indicatorContainer as any, // Cast to any or update Journal type
                opened: false,
                state: "rest",
            });
        });

        window.addEventListener("modal-close", this.handleModalClose);

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            window.removeEventListener("modal-close", this.handleModalClose);
        });



        // Chest "near player" blink/hover (switch 0 <-> 1)
        this.anims.create({
            key: "chest-hover",
            frames: this.anims.generateFrameNumbers("chest", { frames: [0, 1] }),
            frameRate: 4,
            repeat: -1,
        });

        // Chest open: 1 -> 2 -> 4
        this.anims.create({
            key: "chest-open",
            frames: this.anims.generateFrameNumbers("chest", { frames: [1, 2, 4] }),
            frameRate: 6,
            repeat: 0
        });

        // Chest close: 4 -> 2 -> 1
        this.anims.create({
            key: "chest-close",
            frames: this.anims.generateFrameNumbers("chest", { frames: [4, 2, 1] }),
            frameRate: 6,
            repeat: 0
        });

        this.textures.get("chest").setFilter(Phaser.Textures.FilterMode.NEAREST);

        // --- Eggs ---
        this.spawnEgg(300, 300);
        this.spawnEgg(800, 600);
        this.spawnEgg(100, 400);

        this.textures.get("egg").setFilter(Phaser.Textures.FilterMode.NEAREST);

        // --- Input ---
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.wasd = this.input.keyboard!.addKeys("W,A,S,D");

        // --- Camera ---
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(3); // <-- THIS replaces layer scaling
        this.cameras.main.roundPixels = true;

    }

    private spawnEgg(x: number, y: number) {
        const egg = this.physics.add.sprite(x, y, "egg");
        egg.setTint(0xf472b6);
        egg.setImmovable(true);

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

        this.children.each(child => {
            // 1. Dynamic Depth Sorting for all sprites
            this.children.each(child => {
                if (child instanceof Phaser.GameObjects.Sprite && !(child as any).isPath) {
                    // We set depth to Y so that items lower on screen are "closer"
                    child.setDepth(child.y);
                }
            });
            // 2. Force the Player and Chests to be slightly in front if at the exact same Y
            this.player.setDepth(this.player.y + 1);
        });

        // Check journal interaction
        this.journals.forEach(j => {
            const d = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                j.sprite.x,
                j.sprite.y
            );

            const near = d < 30;
            j.indicator.setVisible(near && !this.isModalOpen);

            // --- HOVER ---
            if (near && j.state === "rest") {
                j.sprite.play("chest-hover");
                j.state = "hover";
            }

            // --- LEAVE ---
            if (!near && j.state === "hover") {
                j.sprite.play("chest-rest");
                j.state = "rest";
            }

            // --- OPEN ---
            if (
                near &&
                j.state === "hover" &&
                Phaser.Input.Keyboard.JustDown(this.interactKey)
            ) {
                j.state = "open";
                j.opened = true;

                j.sprite.play("chest-open");

                j.sprite.once(
                    Phaser.Animations.Events.ANIMATION_COMPLETE,
                    () => {
                        this.time.delayedCall(100, () => {
                            window.dispatchEvent(
                                new CustomEvent("open-journal", {
                                    detail: { id: j.id },
                                })
                            );
                        });
                    }
                );
            }
        });

    }
}
