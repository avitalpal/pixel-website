import * as Phaser from "phaser";

const TILE_SIZE = 32;
const MAP_WIDTH = 75;
const MAP_HEIGHT = 50;

const WORLD_WIDTH = MAP_WIDTH * TILE_SIZE;
const WORLD_HEIGHT = MAP_HEIGHT * TILE_SIZE;

type Journal = {
    id: string;
    sprite: Phaser.Physics.Arcade.Sprite;
    indicator: Phaser.GameObjects.Text;
    opened: boolean;
};


export default class MainScene extends Phaser.Scene {
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd!: any;
    private interactKey!: Phaser.Input.Keyboard.Key;

    private journals: Journal[] = [];
    private gems: Phaser.Physics.Arcade.Sprite[] = [];


    constructor() {
        super("MainScene");
    }

    preload() {
        this.load.image("ground", "/tiles/ground.png");
        this.textures.generate("player", { data: ["1111", "1111", "1111", "1111"], pixelWidth: 8 });

        this.load.on("loaderror", (file: any) => console.error("Error loading:", file.key, file.url));
    }

    create() {
        this.interactKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Fill background
        for (let y = 0; y < MAP_HEIGHT; y++) {
            for (let x = 0; x < MAP_WIDTH; x++) {
                this.add.image(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, "ground");
            }
        }

        this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

        // --- Player ---
        this.player = this.physics.add.sprite(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, "player");
        this.player.setTint(0x22c55e);
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(3);

        // --- Gems ---
        const gemPositions = [
            { x: WORLD_WIDTH / 2 - 120, y: WORLD_HEIGHT / 2 },
            { x: WORLD_WIDTH / 2 + 200, y: WORLD_HEIGHT / 2 - 100 }
        ];
        gemPositions.forEach((pos) => {
            const gem = this.physics.add.sprite(pos.x, pos.y, "player");
            gem.setTint(0x38bdf8);
            gem.setImmovable(true);
            this.gems.push(gem);
        });

        // --- Journals ---
        const positions = [
            { id: "j1", x: WORLD_WIDTH / 2 + 100, y: WORLD_HEIGHT / 2 },
            { id: "j2", x: WORLD_WIDTH / 2 + 300, y: WORLD_HEIGHT / 2 + 50 },
            { id: "j3", x: WORLD_WIDTH / 2 - 200, y: WORLD_HEIGHT / 2 - 100 },
            { id: "j4", x: WORLD_WIDTH / 2 - 300, y: WORLD_HEIGHT / 2 + 200 },
        ];

        positions.forEach((j) => {
            const sprite = this.physics.add.sprite(j.x, j.y, "player");
            sprite.setTint(0xfacc15);
            sprite.setImmovable(true);
            sprite.setDepth(2);

            const indicator = this.add
                .text(j.x, j.y - 32, "E", {
                    font: "16px Arial",
                    color: "#fff",
                    backgroundColor: "#000000aa",
                    padding: { x: 2, y: 2 },
                })
                .setOrigin(0.5)
                .setVisible(false)
                .setDepth(4);

            this.journals.push({
                id: j.id,
                sprite,
                indicator,
                opened: false,
            });
        });


        // --- Eggs ---
        this.spawnEgg(300, 300);
        this.spawnEgg(800, 600);
        this.spawnEgg(1600, 400);

        // --- Input ---
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.wasd = this.input.keyboard!.addKeys("W,A,S,D");

        // --- Camera ---
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
        let vx = 0, vy = 0;

        if (this.cursors.left.isDown || this.wasd.A.isDown) vx = -speed;
        if (this.cursors.right.isDown || this.wasd.D.isDown) vx = speed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vy = -speed;
        if (this.cursors.down.isDown || this.wasd.S.isDown) vy = speed;

        this.player.setVelocity(vx, vy);
        this.player.body!.velocity.normalize().scale(speed);

        // Check journal interaction
        this.journals.forEach((j) => {
            const d = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                j.sprite.x,
                j.sprite.y
            );

            j.indicator.setVisible(d < 50);

            if (d < 40 && Phaser.Input.Keyboard.JustDown(this.interactKey)) {
                window.dispatchEvent(
                    new CustomEvent("open-journal", { detail: { id: j.id } })
                );
                j.opened = true;
            }
        });

        // Check gem pickups
        this.gems.forEach(gem => {
            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, gem.x, gem.y);
            if (dist < 30) {
                window.dispatchEvent(new CustomEvent("pickup-item", { detail: "Gem" }));
                gem.destroy();
            }
        });
    }
}
