"use client";

import { useState } from "react";
import Modal from "@/app/shared-components/Modal";

export default function HelpButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Question mark button */}
            <button
                className="fixed left-4 top-4 hover:cursor-pointer px-3 py-1 border-2 border-blue-200 rounded-full shadow-md bg-gray-100 hover:bg-stone-200 transition"
                onClick={() => setIsOpen(true)}
            >
                ?
            </button>

            {/* Modal only rendered when open */}
            {isOpen && (
                <Modal title="Help" onClose={() => setIsOpen(false)}>
                    <div className="space-y-8 text-lg">
                        <p>Welcome to my game/website/thing! I built this from scratch with NextJS, TailwindCSS, and Phaser. It's one of my favorite projects to date, built with headaches and lots of &lt;3 !</p>
                        <p>Use the <b>arrow keys</b> or <b>WASD</b> to move around and explore the map.</p>
                    </div>
                    <p className="text-lg">There are items that you can <b>interact</b> with.
                        They're marked with an <b>"E" prompt</b> when you approach them, and you can use them to learn more about me, my projects, my passions, and more :]
                    </p>
                    <div className="space-y-8">
                        <p className="text-lg">I've also included <b>easter eggs</b> that you can find, and you can collect them just by walking up to them.
                            Maybe if you find them all there'll be a <b>prize*</b> :)
                        </p>
                        <p className="text-sm text-stone-500 px-1">*Probably not a cool one because I'm on a student budget, sorry &lt;/3</p>
                    </div>
                </Modal>
            )}
        </>
    );
}
