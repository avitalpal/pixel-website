import Link from "next/link";

export default function SwitchSite({ destination }: { destination: 'website' | 'gamified' }) {
    return (
        <div className="flex gap-4">
            <Link
                href={`/${destination === 'website' ? 'website' : 'gamified'}`}
                className="px-6 py-3 border-2 border-stone-800 hover:bg-stone-200 transition"
            >
                {
                    destination === 'website' ? 'Turn Off Game Mode' : 'Enter Game Mode'
                }
            </Link>
        </div>
    );
}
