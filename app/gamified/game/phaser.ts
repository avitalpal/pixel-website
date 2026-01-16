import * as Phaser from "phaser";
import MainScene from "./player";

let game: Phaser.Game | null = null;

export function startGame(containerId: string) {
  if (game) return; // prevent double init (VERY important in React)

  game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: containerId,
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,   // ✅ crucial for crisp pixels
    roundPixels: true,
    backgroundColor: "#FFFFFF",
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    scene: [MainScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  });
}