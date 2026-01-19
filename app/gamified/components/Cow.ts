import * as Phaser from "phaser";

type CowData = {
    sprite: Phaser.Physics.Arcade.Sprite;
    box: Phaser.Geom.Rectangle;
    moving: boolean;
    target?: Phaser.Math.Vector2;
    idleTimer: number;
};

export default class Cows {
    private scene: Phaser.Scene;
    private cows: CowData[] = [];
    private collidables: Phaser.GameObjects.GameObject[] | Phaser.Tilemaps.TilemapLayer[];

    constructor(
        scene: Phaser.Scene,
        count: number,
        collidables: (Phaser.GameObjects.GameObject | Phaser.Tilemaps.TilemapLayer)[]
    ) {
        this.scene = scene;
        this.collidables = collidables;

        if (scene.textures.exists("cow")) {
            scene.textures.get("cow").setFilter(Phaser.Textures.FilterMode.NEAREST);
        }

        // Animations
        if (!scene.anims.exists("cow-idle")) {
            scene.anims.create({
                key: "cow-idle",
                frames: scene.anims.generateFrameNumbers("cow", { frames: [0, 1, 2] }),
                frameRate: 0.5, // Slow animation - one cycle every 6 seconds
                repeat: -1,
            });
        }

        if (!scene.anims.exists("cow-walk")) {
            scene.anims.create({
                key: "cow-walk",
                frames: scene.anims.generateFrameNumbers("cow", { frames: [3, 4] }),
                frameRate: 4,
                repeat: -1,
            });
        }

        // Spawn cows
        for (let i = 0; i < count; i++) {
            const spawnBox = this.getSafeBox(32);
            const x = Phaser.Math.Between(spawnBox.left, spawnBox.right);
            const y = Phaser.Math.Between(spawnBox.top, spawnBox.bottom);

            const cow = scene.physics.add.sprite(x, y, "cow");
            cow.setOrigin(0.5);
            cow.setCollideWorldBounds(true);
            cow.anims.play("cow-idle");
            cow.setFlipX(Phaser.Math.Between(0, 1) === 0);

            this.cows.push({
                sprite: cow,
                box: spawnBox,
                moving: false,
                idleTimer: Phaser.Math.Between(60, 120),
            });
        }

        scene.events.on("update", this.update, this);
    }

    private update() {
        this.cows.forEach(cowData => {
            const cow = cowData.sprite;
            cow.setDepth(cow.y + 16);

            if (cowData.moving && cowData.target) {
                const dist = Phaser.Math.Distance.Between(
                    cow.x, cow.y,
                    cowData.target.x, cowData.target.y
                );

                if (dist < 2 || cowData.target.x === undefined || cowData.target.y === undefined) {
                    // Reached destination - transition to idle
                    cow.setVelocity(0, 0);
                    cowData.moving = false;
                    cowData.target = undefined;
                    cowData.idleTimer = Phaser.Math.Between(120, 240);
                    
                    if (cow.anims.currentAnim?.key !== "cow-idle") {
                        cow.play("cow-idle");
                    }
                } else {
                    // Continue moving
                    const angle = Phaser.Math.Angle.BetweenPoints(cow, cowData.target);
                    this.scene.physics.velocityFromRotation(angle, 20, cow.body!.velocity);

                    if (cow.anims.currentAnim?.key !== "cow-walk") {
                        cow.play("cow-walk");
                    }
                    cow.setFlipX(cow.body!.velocity.x < 0);
                }
            } else {
                // Idle state
                cow.setVelocity(0, 0);
                cowData.idleTimer--;

                if (cowData.idleTimer <= 0) {
                    // Time to move - pick new target
                    cowData.target = new Phaser.Math.Vector2(
                        Phaser.Math.Between(cowData.box.left, cowData.box.right),
                        Phaser.Math.Between(cowData.box.top, cowData.box.bottom)
                    );
                    cowData.moving = true;
                }
            }
        });
    }

    private isBoxFree(rect: Phaser.Geom.Rectangle): boolean {
        // Add a margin buffer around the box
        const margin = 16;
        const checkRect = new Phaser.Geom.Rectangle(
            rect.left - margin,
            rect.top - margin,
            rect.width + margin * 2,
            rect.height + margin * 2
        );

        for (const col of this.collidables) {
            if (col instanceof Phaser.Tilemaps.TilemapLayer) {
                const tiles = col.getTilesWithinWorldXY(
                    checkRect.left, checkRect.top, checkRect.width, checkRect.height
                );
                if (tiles.some(t => t.collides)) return false;
            } else if (col instanceof Phaser.Physics.Arcade.Sprite) {
                const spriteRect = col.getBounds();
                if (Phaser.Geom.Intersects.RectangleToRectangle(checkRect, spriteRect)) {
                    return false;
                }
            }
        }
        return true;
    }

    private getSafeBox(size: number): Phaser.Geom.Rectangle {
        const maxAttempts = 100;
        const worldBounds = this.scene.physics.world.bounds;
        const TILE_SIZE = 32;
        
        // Keep spawn box away from world edges (1 tile buffer)
        const edgeMargin = TILE_SIZE + size;
        
        for (let i = 0; i < maxAttempts; i++) {
            const x = Phaser.Math.Between(
                worldBounds.x + edgeMargin,
                worldBounds.right - edgeMargin
            );
            const y = Phaser.Math.Between(
                worldBounds.y + edgeMargin,
                worldBounds.bottom - edgeMargin
            );
            const rect = new Phaser.Geom.Rectangle(x, y, size, size);

            if (this.isBoxFree(rect)) return rect;
        }
        
        // Fallback: center of map
        return new Phaser.Geom.Rectangle(
            worldBounds.centerX - size / 2,
            worldBounds.centerY - size / 2,
            size,
            size
        );
    }
}