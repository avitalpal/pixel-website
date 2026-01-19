"use client";

import { useState, useEffect } from "react";
import { InventoryItem } from "./inventory-types";

export default function Inventory({ items }: { items: InventoryItem[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedIndex(index);

    // Dispatch event for selection
    const item = items[index];
    if (item) {
      window.dispatchEvent(new CustomEvent("inventory-select", { detail: item.name }));
    }
  };

  const handleInteract = () => {
    if (selectedIndex !== null && items[selectedIndex]) {
      const item = items[selectedIndex];
      item.action();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "c" || e.key === "C") {
        handleInteract();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedIndex, items]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="flex gap-2 bg-stone-100 border-2 border-stone-800 p-2 mb-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`w-14 h-14 border flex items-center justify-center text-xs cursor-pointer transition-colors
              ${selectedIndex === i ? "border-yellow-400 bg-yellow-50" : "border-stone-600"}
            `}
            onClick={() => handleClick(i)}
          >
            {items[i] && (
              <img
                src={`/${items[i].name}.png`}
                alt=""
                className="w-8 h-8"
              />
            )}
          </div>
        ))}
      </div>
      {selectedIndex !== null && items[selectedIndex] && (
        <div className="pixel-font text-center bg-stone-100 border-2 border-stone-800 px-3 py-1 text-sm">
          Press <kbd className="px-1 bg-stone-200 border border-stone-400 rounded">C</kbd> to {items[selectedIndex].description ?? "use"}
        </div>
      )}
    </div>
  );
}