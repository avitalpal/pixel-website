"use client"; // Required for state in Next.js 13 app directory
import Link from "next/link";
import { useState } from "react";

export default function SwitchSite({ destination }: { destination: "website" | "gamified" }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex gap-4 items-center">
      <Link
        href={`/${destination === "website" ? "website" : "gamified"}`}
        className={`pixel-font px-6 py-3 border-2 text-stone-800 border-stone-800 bg-stone-100 hover:bg-stone-300 transition flex items-center justify-center`}
        onClick={() => setLoading(true)}
      >
        {loading ? (
          // Simple spinner using Tailwind
          <div className="w-5 h-5 border-2 border-stone-800 border-t-transparent rounded-full animate-spin"></div>
        ) : destination === "website" ? (
          "Turn Off Game Mode"
        ) : (
          "Enter Game Mode"
        )}
      </Link>
    </div>
  );
}
