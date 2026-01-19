import * as Phaser from "phaser";

export type RandomObjectKey =
    | "tree-thin" | "tree-thick" | "tree-apples"
    | "mushroom-pair" | "mushroom" | "mini-mushroom" 
    | "leaf" | "rock" | "big-rock"
    | "apple" | "apple-leaf" | "thin-stump" | "thick-stump" | "log"
    | "yellow-bud" | "yellow-flower" | "sunflower"
    | "bush-berry" | "bush" | "berry" | "berry-leaf"
    | "blue-flower" | "pink-bud" | "pink-flower";

interface ObjectFrame {
    x: number;
    y: number;
    width: number;
    height: number;
    visualHeight?: number;
    baseOffset?: number; 
}

export const OBJECT_FRAMES: Record<RandomObjectKey, ObjectFrame> = {
    // 🌲 Trees / tall plants
    "tree-thin":     { x: 1,   y: 0,  width: 14, height: 29, visualHeight: 29 },
    "tree-thick":    { x: 20,  y: 1,  width: 24, height: 31, visualHeight: 31 },
    "tree-apples":   { x: 52,  y: 1,  width: 24, height: 31, visualHeight: 31 },
    "sunflower":     { x: 129, y: 34, width: 14, height: 29, visualHeight: 29 },

    // 🍄 Mushrooms
    "mushroom-pair": { x: 82,  y: 2,  width: 13, height: 13, visualHeight: 13 },
    "mushroom":      { x: 100, y: 4,  width: 10, height: 11, visualHeight: 11 },
    "mini-mushroom": { x: 115, y: 3,  width: 7,  height: 8,  visualHeight: 8 },

    // 🍃 Ground clutter
    "leaf":          { x: 84,  y: 23, width: 8,  height: 5,  visualHeight: 5 },
    "rock":          { x: 114, y: 18, width: 10, height: 8,  visualHeight: 8 },
    "big-rock":      { x: 128, y: 17, width: 16, height: 13, visualHeight: 13 },

    // 🍎 Apples / wood
    "apple":         { x: 4,   y: 39, width: 7,  height: 5,  visualHeight: 5 },
    "apple-leaf":    { x: 20,  y: 36, width: 7,  height: 8,  visualHeight: 8 },
    "thin-stump":    { x: 52,  y: 36, width: 8,  height: 10, visualHeight: 10 },
    "thick-stump":   { x: 67,  y: 36, width: 10, height: 10, visualHeight: 10 },
    "log":           { x: 80,  y: 35, width: 16, height: 10, visualHeight: 10 },

    // 🌼 Flowers
    "yellow-bud":    { x: 99,  y: 39, width: 9,  height: 6,  visualHeight: 6 },
    "yellow-flower": { x: 114, y: 37, width: 11, height: 9,  visualHeight: 9 },
    "blue-flower":   { x: 83,  y: 50, width: 11, height: 12, visualHeight: 12 },
    "pink-bud":      { x: 99,  y: 54, width: 9,  height: 6,  visualHeight: 6 },
    "pink-flower":   { x: 114, y: 52, width: 11, height: 9,  visualHeight: 9 },

    // 🌿 Bushes / berries
    "bush-berry":    { x: 0,   y: 48, width: 16, height: 16, visualHeight: 16 },
    "bush":          { x: 16,  y: 48, width: 16, height: 16, visualHeight: 16 },
    "berry":         { x: 38,  y: 56, width: 4,  height: 4,  visualHeight: 4 },
    "berry-leaf":    { x: 53,  y: 54, width: 6,  height: 6,  visualHeight: 6 },
};

export interface RandomPopulateOptions {
    scene: Phaser.Scene;
    map: Phaser.Tilemaps.Tilemap;
    collidables: (Phaser.GameObjects.GameObject | Phaser.Tilemaps.TilemapLayer)[];
    tilesetKey: string;
    density?: number;
    gapCheckTileIndices?: number[];
}

export function randomPopulate({
    scene,
    map,
    collidables,
    tilesetKey,
    density = 0.5,
    gapCheckTileIndices = [],
}: RandomPopulateOptions): Phaser.GameObjects.Sprite[] {
    
    const objects: RandomObjectKey[] = Object.keys(OBJECT_FRAMES) as RandomObjectKey[];
    const createdSprites: Phaser.GameObjects.Sprite[] = [];
    const occupiedRects: Phaser.Geom.Rectangle[] = [];
    const worldBounds = scene.physics.world.bounds;

    const texture = scene.textures.get(tilesetKey);
    
    if (!texture) {
        console.error("❌ CRITICAL: Texture not found!", tilesetKey);
        return [];
    }

    objects.forEach(key => {
        if (!texture.has(key)) {
            const f = OBJECT_FRAMES[key];
            texture.add(key, 0, f.x, f.y, f.width, f.height);
        }
    });

    const NUM_DECORATIONS = Math.floor(map.width * map.height * density);

    const isAreaClear = (rect: Phaser.Geom.Rectangle) => {
        if (occupiedRects.some(r => Phaser.Geom.Intersects.RectangleToRectangle(rect, r))) {
            return false;
        }

        for (let colIdx = 0; colIdx < collidables.length; colIdx++) {
            const col = collidables[colIdx];
            
            if (col instanceof Phaser.Tilemaps.TilemapLayer) {
                const tiles = col.getTilesWithinWorldXY(rect.x, rect.y, rect.width, rect.height);
                if (tiles.length > 0) {
                    const blockedTile = tiles.find(t => t.collides || gapCheckTileIndices.includes(t.index));
                    if (blockedTile) return false;
                }
            } else if (col instanceof Phaser.GameObjects.Sprite) {
                if (Phaser.Geom.Intersects.RectangleToRectangle(rect, col.getBounds())) {
                    return false;
                }
            }
        }
        return true;
    };

    let successCount = 0;
    let totalAttempts = 0;
    
    for (let i = 0; i < NUM_DECORATIONS; i++) {
        const key = Phaser.Utils.Array.GetRandom(objects);
        const frameData = OBJECT_FRAMES[key];

        let placed = false;
        let attempts = 0;
        const maxAttempts = 50;

        while (!placed && attempts < maxAttempts) {
            attempts++;
            totalAttempts++;

            const x = Phaser.Math.Between(worldBounds.x + 16, worldBounds.right - 16 - frameData.width);
            const y = Phaser.Math.Between(worldBounds.y + 16, worldBounds.bottom - 16 - frameData.height);

            const testRect = new Phaser.Geom.Rectangle(x, y, frameData.width, frameData.height);

            if (isAreaClear(testRect)) {
                const sprite = scene.add.sprite(
                    testRect.centerX,
                    testRect.bottom,
                    tilesetKey,
                    key
                );

                const originY = frameData.height >= 16 ? 0.7 : 0.4;
                sprite.setOrigin(0.5, originY);
                
                // The visual content starts at (x, y) in the spritesheet
                // Use the actual visual bounds, not the transparent margins
                const visualHeight = frameData.visualHeight || frameData.height;
                
                // How much transparent space is above the visual content?
                const transparentAtTop = frameData.height - visualHeight;
                
                // Depth should be calculated as if the visual content bottom is at sprite.y
                const visualBottomY = sprite.y - transparentAtTop;
                
                sprite.setDepth(visualBottomY);
                
                sprite.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
                sprite.setVisible(true);

                (sprite as any).isDecoration = true;

                occupiedRects.push(testRect);
                createdSprites.push(sprite);
                placed = true;
                successCount++;
            }
        }
    }
    return createdSprites;
}