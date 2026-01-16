"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import Modal from "../shared-components/Modal";
import Inventory from "./components/Inventory";
import EggCounter from "./components/EggCounter";
import JournalCounter from "./components/JournalCounter";

import JournalContent from "./components/JournalContent";
import journalData from "./game/data/journals";
type JournalId = keyof typeof journalData;

import SwitchSite from "../shared-components/SwitchSite";
import HelpButton from "./components/HelpButton";
import AssetCredit from "./components/AssetCredit";

// Dynamically load Phaser wrapper only in browser
const GameClient = dynamic(() => import("./game/GameClient"), { ssr: false });

export default function GamifiedPage() {
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [activeModal, setActiveModal] = useState<null | "book">(null);
    const [inventory, setInventory] = useState<string[]>([]);

    const [eggs, setEggs] = useState(0);
    const [hasEggModalBeenShown, setHasEggModalBeenShown] = useState(false);

    const [activeJournalId, setActiveJournalId] = useState<JournalId | null>(null);
    const [openedJournals, setOpenedJournals] = useState<Set<JournalId>>(new Set());
    const [showCompletionModal, setShowCompletionModal] = useState(false);

    const TOTAL_EGGS = 3;
    const TOTAL_JOURNALS = 4;

    useEffect(() => {
        const handler = (e: Event) => {
            const { id } = (e as CustomEvent<{ id: JournalId }>).detail;;

            setOpenedJournals((prev) => {
                const next = new Set(prev);
                next.add(id);
                return next;
            });

            setActiveJournalId(id);
        };

        window.addEventListener("open-journal", handler);
        return () => window.removeEventListener("open-journal", handler);
    }, []);



    useEffect(() => {
        const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        const openBook = () => setActiveModal("book");
        window.addEventListener("open-book", openBook);
        return () => window.removeEventListener("open-book", openBook);
    }, []);

    useEffect(() => {
        const pickupItem = (e: Event) => {
            const item = (e as CustomEvent<string>).detail;
            setInventory((prev) => {
                if (prev.length >= 4) return prev;
                if (prev.includes(item)) return prev;
                return [...prev, item];
            });
        };
        window.addEventListener("pickup-item", pickupItem);
        return () => window.removeEventListener("pickup-item", pickupItem);
    }, []);

    useEffect(() => {
        const collectEgg = () => setEggs((prev) => Math.min(prev + 1, TOTAL_EGGS));
        window.addEventListener("collect-egg", collectEgg);
        return () => window.removeEventListener("collect-egg", collectEgg);
    }, []);

    if (!isLargeScreen) {
        return (
            <div className="md:hidden min-h-screen flex flex-col gap-8 items-center justify-center bg-stone-100 text-center px-6">
                <p className="pixel-font text-stone-700">
                    Game mode isn't available on mobile right now, sorry!
                </p>
                <SwitchSite destination="website" />
            </div>
        );
    }

    return (
        <>
            <div className="fixed inset-0 bg-transparent overflow-hidden">
                <GameClient active={isLargeScreen} />
            </div>

            <div className="fixed top-4 left-4 z-40 flex flex-col gap-1 pixel-font text-sm text-stone-800">
                <EggCounter collected={eggs} total={TOTAL_EGGS} />
                <JournalCounter openedJournals={openedJournals} total={TOTAL_JOURNALS} />
            </div>

            <Inventory items={inventory} />
            <HelpButton />
            <AssetCredit />

            <div className="fixed bottom-4 right-4 z-40">
                <SwitchSite destination="website" />
            </div>

            {activeJournalId && (
                <Modal
                    title={journalData[activeJournalId].title}
                    onClose={() => {
                        setActiveJournalId(null);
                        if (openedJournals.size === TOTAL_JOURNALS) {
                            setShowCompletionModal(true);
                        }
                    }}
                >
                    <JournalContent
                        content={journalData[activeJournalId].content}
                    />
                </Modal>
            )}


            {(eggs === TOTAL_EGGS && !hasEggModalBeenShown) && (
                <Modal title="Secret Unlocked"
                    onClose={() => {
                        setHasEggModalBeenShown(true);
                        setActiveModal(null);
                    }}
                >
                    <p>You found all the Easter eggs 👀</p>
                </Modal>
            )}

            {showCompletionModal && (
                <Modal
                    title="Journalist Extraordinaire"
                    onClose={() => setShowCompletionModal(false)}
                >
                    <p>You discovered all journals — thanks for exploring!</p>
                </Modal>
            )}

        </>
    );
}
