"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";
import MainScene from "./player";

export default function GameClient({ active }: { active: boolean }) {
    const gameRef = useRef<Phaser.Game | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (gameRef.current) return; // already created

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: containerRef.current!,
            physics: {
                default: "arcade",
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

        // Only destroy on full unmount
        return () => {
            gameRef.current?.destroy(true, false);
            gameRef.current = null;
        };
    }, []);

    // Just hide/show instead of destroying
    return (
        <div
            ref={containerRef}
            style={{ display: active ? "block" : "none" }}
            className="fixed inset-0 z-0"
        />
    );
}
