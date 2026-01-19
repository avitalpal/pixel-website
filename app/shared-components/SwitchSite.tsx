import Link from "next/link";

export default function SwitchSite({ destination }: { destination: 'website' | 'gamified' }) {
    return (
        <div className="flex gap-4">
            <Link
                href={`/${destination === 'website' ? 'website' : 'gamified'}`}
                className="pixel-font px-6 py-3 border-2 text-stone-800 border-stone-800 bg-stone-100 hover:bg-stone-300 transition"
            >
                {
                    destination === 'website' ? 'Turn Off Game Mode' : 'Enter Game Mode'
                }
            </Link>
        </div>
    );
}
