import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="w-full border-b border-stone-300 bg-stone-100">
      <nav className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
        <Logo />

        <div className="flex gap-4 text-sm">
          <Link href="/website#about" className="hover:underline">
            About
          </Link>
          <Link href="/website#projects" className="hover:underline">
            Projects
          </Link>
          <Link href="/" className="hover:underline">
            Exit
          </Link>
        </div>
      </nav>
    </header>
  );
}