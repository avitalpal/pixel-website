"use client";

import { useState } from "react";

export default function Inventory({
  items,
}: {
  items: string[];
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedIndex(index);

    // Do something with the item
    const item = items[index];
    if (item) {
      window.dispatchEvent(new CustomEvent("inventory-select", { detail: item }));
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="flex gap-2 bg-stone-100 border-2 border-stone-800 p-2 pixel-font">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`w-10 h-10 border flex items-center justify-center text-xs cursor-pointer
              ${selectedIndex === i ? "border-yellow-400" : "border-stone-600"}
            `}
            onClick={() => handleClick(i)}
          >
            {items[i] ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}
