"use client";

export default function JournalCounter({
  openedJournals,
  total,
}: {
  openedJournals: Set<string>;
  total: number;
}) {
  return (
    <div className="fixed top-4 right-4 z-40 pixel-font bg-stone-100 border-2 border-stone-800 px-3 py-1 text-sm">
      📓 {openedJournals.size} / {total}
    </div>
  );
}