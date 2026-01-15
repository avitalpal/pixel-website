"use client";

export default function EggCounter({
  collected,
  total,
}: {
  collected: number;
  total: number;
}) {
  return (
    <div className="fixed top-4 right-4 z-40 pixel-font bg-stone-100 border-2 border-stone-800 px-3 py-1 text-sm">
      🥚 {collected} / {total}
    </div>
  );
}