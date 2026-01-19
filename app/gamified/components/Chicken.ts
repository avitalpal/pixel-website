import * as Phaser from "phaser";

type ChickenData = {
    sprite: Phaser.Physics.Arcade.Sprite;
    box: Phaser.Geom.Rectangle;
    moving: boolean;
    target?: Phaser.Math.Vector2;
    idleTimer: number;
}

export default class Chickens {
    private scene: Phaser.Scene;
    private chickens: ChickenData[] = [];
    private collidables: Phaser.GameObjects.GameObject[] | Phaser.Tilemaps.TilemapLayer[];

    constructor(
        scene: Phaser.Scene,
        count: number,
        collidables: (Phaser.GameObjects.GameObject | Phaser.Tilemaps.TilemapLayer)[]
    ) {
        this.scene = scene;
        this.collidables = collidables;

        // Set nearest filter
        if (scene.textures.exists("chicken")) {
            scene.textures.get("chicken").setFilter(Phaser.Textures.FilterMode.NEAREST);
        }

        // Animations
        if (!scene.anims.exists("chicken-idle")) {
            scene.anims.create({
                key: "chicken-idle",
                frames: scene.anims.generateFrameNumbers("chicken", { frames: [0, 1] }),
                frameRate: 0.5, // Blink every 2 seconds
                repeat: -1,
            });
        }

        if (!scene.anims.exists("chicken-walk")) {
            scene.anims.create({
                key: "chicken-walk",
                frames: scene.anims.generateFrameNumbers("chicken", { frames: [4, 5, 6, 7] }),
                frameRate: 8,
                repeat: -1,
            });
        }

        // Spawn chickens
        for (let i = 0; i < count; i++) {
            const spawnBox = this.getSafeBox(32);
            const x = Phaser.Math.Between(spawnBox.left, spawnBox.right);
            const y = Phaser.Math.Between(spawnBox.top, spawnBox.bottom);

            const chicken = scene.physics.add.sprite(x, y, "chicken");
            chicken.setOrigin(0.5);
            chicken.setCollideWorldBounds(true);
            chicken.anims.play("chicken-idle");
            chicken.setFlipX(Phaser.Math.Between(0, 1) === 0);

            this.chickens.push({
                sprite: chicken,
                box: spawnBox,
                moving: false,
                idleTimer: Phaser.Math.Between(60, 120),
            });
        }

        scene.events.on("update", this.update, this);
    }

    private update() {
        this.chickens.forEach(chickenData => {
            const chicken = chickenData.sprite;
            chicken.setDepth(chicken.y + 8);

            if (chickenData.moving && chickenData.target) {
                const dist = Phaser.Math.Distance.Between(
                    chicken.x, chicken.y,
                    chickenData.target.x, chickenData.target.y
                );

                if (dist < 2 || chickenData.target.x === undefined || chickenData.target.y === undefined) {
                    // Reached destination - transition to idle
                    chicken.setVelocity(0, 0);
                    chickenData.moving = false;
                    chickenData.target = undefined;
                    chickenData.idleTimer = Phaser.Math.Between(120, 300);

                    if (chicken.anims.currentAnim?.key !== "chicken-idle") {
                        chicken.play("chicken-idle");
                    }
                } else {
                    // Continue moving
                    const angle = Phaser.Math.Angle.BetweenPoints(chicken, chickenData.target);
                    this.scene.physics.velocityFromRotation(angle, 20, chicken.body!.velocity);

                    if (chicken.anims.currentAnim?.key !== "chicken-walk") {
                        chicken.play("chicken-walk");
                    }
                    chicken.setFlipX(chicken.body!.velocity.x < 0);
                }
            } else {
                // Idle state
                chicken.setVelocity(0, 0);
                chickenData.idleTimer--;

                if (chickenData.idleTimer <= 0) {
                    // Time to move - pick new target
                    chickenData.target = new Phaser.Math.Vector2(
                        Phaser.Math.Between(chickenData.box.left, chickenData.box.right),
                        Phaser.Math.Between(chickenData.box.top, chickenData.box.bottom)
                    );
                    chickenData.moving = true;
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