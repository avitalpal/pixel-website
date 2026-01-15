import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="hidden lg:flex min-h-screen items-center justify-center bg-stone-100">
      <div className="flex flex-col items-center gap-6 pixel-font">
        <h1 className="text-3xl font-bold">Welcome</h1>

        <div className="flex gap-4">
          <Link
            href="/website"
            className="px-6 py-3 border-2 border-stone-800 hover:bg-stone-200 transition"
          >
            Regular Mode
          </Link>

          <Link
            href="/gamified"
            className="px-6 py-3 border-2 border-stone-800 hover:bg-stone-200 transition"
          >
            Game Mode
          </Link>
        </div>

        <p className="text-sm text-stone-500">
          (Game mode available on large screens only)
        </p>
      </div>
    </div>
  );
}
