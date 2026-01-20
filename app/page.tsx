'use client';

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Tailwind lg breakpoint = 1024px
    const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;

    if (!isLargeScreen) {
      router.replace("/website");
    }
  }, [router]);

  return (
    <div className="hidden lg:flex min-h-screen items-center justify-center bg-[url('/backgrounds/landing-bg.jpg')] bg-cover">
      <div className="flex flex-col items-center gap-6 pixel-font bg-gray-100 px-8 py-12 rounded-lg shadow-lg max-w-1/2 text-center">
        <h1 className="text-5xl font-bold text-blue-500">WELCOME</h1>
        <h3 className="text-2xl font-bold text-blue-500">
          to my personal website!
        </h3>

        <div className="w-3/4 flex gap-12 text-stone-800 text-xl">
          <div className="flex-1 flex flex-col items-center gap-2 group">
            <Link
              href="/website"
              className="w-full px-6 py-3 border border-blue-200 rounded-xl shadow-md bg-gray-100 hover:bg-stone-200 transition"
            >
              Website Mode
            </Link>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity text-sm text-stone-600">
              (Nice choice!)
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center gap-2 group">
            <Link
              href="/gamified"
              className="w-full h-full px-6 py-3 border border-blue-200 rounded-xl shadow-md bg-gray-100 hover:bg-stone-200 transition"
            >
              Game Mode
            </Link>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity text-sm text-stone-600">
              (Have fun!)
            </p>
          </div>
        </div>

        <p className="text-baseline text-stone-700 -mt-4">
          I've made regular portfolio websites in the past, but I decided it was
          time to try something new. I thought, why not make it more fun (for both
          of our sake), and give you the choice?
          <br />
          You can switch between the two at any time :]
        </p>

        <p className="text-sm text-stone-500">
          For the best experience in game mode, please use a desktop or laptop.
        </p>
      </div>
    </div>
  );
}
