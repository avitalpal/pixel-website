"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import MainScene from "./player";

export default function GameClient() {
    const gameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        if (gameRef.current) return; // prevent double init

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'game-root',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0, x: 0 }
                }
            },
            scene: MainScene,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH
            }
        };

        gameRef.current = new Phaser.Game(config);

        // return () => {
        //     gameRef.current?.destroy(true);
        // };
    }, []);

    return <div id="game-root" className="fixed inset-0 z-0" />;
}
