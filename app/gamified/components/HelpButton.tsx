"use client";

import { useState } from "react";
import Modal from "@/app/shared-components/Modal";

export default function HelpButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Question mark button */}
            <button
                className="fixed left-4 top-4 hover:cursor-pointer px-3 py-1 border-2 border-stone-800 rounded-full shadow-md bg-stone-200 hover:bg-stone-300 transition"
                onClick={() => setIsOpen(true)}
            >
                ?
            </button>

            {/* Modal only rendered when open */}
            {isOpen && (
                <Modal title="Help" onClose={() => setIsOpen(false)}>
                    <div className="space-y-8 text-lg">
                        <p>Welcome to my game/website/thing! I built this from scratch with NextJS, TailwindCSS, and Phaser. It's one of my favorite projects to date, built with headaches and lots of &lt;3 ! More features to come in the future.</p>
                        <p className="select-none">Use the <b>arrow keys</b> or <b>
                            <kbd className="px-1 bg-stone-200 border border-stone-400 rounded">W</kbd>
                            <kbd className="px-1 bg-stone-200 border border-stone-400 rounded">A</kbd>
                            <kbd className="px-1 bg-stone-200 border border-stone-400 rounded">S</kbd>
                            <kbd className="px-1 bg-stone-200 border border-stone-400 rounded">D</kbd></b> 
                            &nbsp;to move around and explore the map.</p>
                    </div>
                    <p className="text-lg">There are items that you can <b>interact</b> with.
                        They're marked with an <b><kbd className="px-1 bg-stone-200 border border-stone-400 rounded">E</kbd> prompt</b> when you approach them, and you can use them to learn more about me, my projects, my passions, and more.
                        <br/>
                        <br/>
                        The counter at the top right will tell you how many you've found, so don't worry about keeping track :]
                    </p>
                    <p className="text-lg">Along the way, you'll find things to <b>pick up</b>.
                        They'll appear in your <b>inventory bar</b> at the bottom of the screen.
                        Click on them to select them, and press <b><kbd className="px-1 bg-stone-200 border border-stone-400 rounded">C</kbd></b> to use them!
                    </p>
                    <div className="space-y-8">
                        <p className="text-lg">I've also included <b>easter eggs</b> that you can find, and you can collect them just by walking up to them. The counter for these is in the top right as well.
                            Maybe if you find them all there'll be a <b>prize*</b> :)
                        </p>
                        <p className="text-sm text-stone-500 px-1">*Probably not a cool one because I'm on a student budget, sorry &lt;/3 
                            <br/>But hey, you can see your character do a little jump!</p>
                    </div>
                </Modal>
            )}
        </>
    );
}
