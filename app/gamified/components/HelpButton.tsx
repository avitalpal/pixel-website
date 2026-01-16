"use client";

import { useState } from "react";
import Modal from "@/app/shared-components/Modal";

export default function HelpButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Question mark button */}
            <button
                className="fixed hover:cursor-pointer hover:bg-stone-300 transition focus:outline-none top-4 left-4 rounded-2xl z-40 pixel-font bg-stone-100 border-2 border-stone-800 px-3 py-1 text-sm"
                onClick={() => setIsOpen(true)}
            >
                ?
            </button>

            {/* Modal only rendered when open */}
            {isOpen && (
                <Modal title="Help" onClose={() => setIsOpen(false)}>
                    <div className="text-lg space-y-3">
                        <p>Use the <b>arrow keys</b> or <b>WASD</b> to move around and explore the map.</p>
                        <p>There are items that you can <b>interact</b> with.
                            They're marked with an <b>"E" prompt</b> when you approach them, and you can use them to learn more about me, my projects, my passions, and more :]
                        </p>
                        <p>I've also included <b>easter eggs</b> that you can find, and you can collect them just by walking up to them.
                            Maybe if you find them all there'll be a <b>prize*</b> :)
                        </p>
                        <p className="text-sm text-stone-500 px-1">*Probably not a cool one because I'm on a student budget, sorry &lt;/3</p>
                    </div>
                </Modal>
            )}
        </>
    );
}
