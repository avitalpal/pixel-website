import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-300 py-6 text-center text-sm text-stone-500 flex flex-col items-center gap-2">
      © {new Date().getFullYear()} Pixel Website

      <Link
        href="/gamified"
        className="mt-2 px-4 py-2 bg-stone-800 text-white rounded hover:bg-stone-700 transition"
      >
        Switch to Game Mode
      </Link>
    </footer>
  );
}
