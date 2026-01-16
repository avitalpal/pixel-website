"use client";

import { useEffect } from "react";

export default function Modal({
    title,
    children,
    onClose,
}: {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}) {
    // Listen for "esc" key to close
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    // Stop propagation so clicks inside the modal don't close it
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={onClose} // click outside closes
        >
            <div
                className="bg-stone-100 border-2 border-stone-800 p-6 max-w-md w-full pixel-font"
                onClick={handleModalClick} // stop closing on inner click
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-3xl text-stone-800">{title}</h2>
                    <button onClick={onClose} className="font-bold hover:cursor-pointer">
                        ✕
                    </button>
                </div>

                <div className="text-stone-700 text-lg space-y-3">{children}</div>
                <p className="text-xs text-stone-500 mt-4">
                    <em>Press "Esc" to close.</em>
                </p>
            </div>
        </div>
    );
}
