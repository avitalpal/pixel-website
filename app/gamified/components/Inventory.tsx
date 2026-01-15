"use client";

export default function Inventory({
  items,
}: {
  items: string[];
}) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
      <div className="flex gap-2 bg-stone-100 border-2 border-stone-800 p-2 pixel-font">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 border border-stone-600 flex items-center justify-center text-xs"
          >
            {items[i] ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}
