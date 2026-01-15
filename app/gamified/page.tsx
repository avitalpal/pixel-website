"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Modal from "../shared-components/Modal";
import Inventory from "./components/Inventory";
import EggCounter from "./components/EggCounter";
import SwitchSite from "../shared-components/SwitchSite";

// Dynamically load Phaser wrapper only in browser
const GameClient = dynamic(() => import("./game/GameClient"), { ssr: false });

export default function GamifiedPage() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [activeModal, setActiveModal] = useState<null | "book">(null);
  const [inventory, setInventory] = useState<string[]>([]);
  const TOTAL_EGGS = 3;
  const [eggs, setEggs] = useState(0);

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
        <GameClient />
      </div>

      <EggCounter collected={eggs} total={TOTAL_EGGS} />
      <Inventory items={inventory} />

      <div className="fixed bottom-4 right-4 z-40">
        <SwitchSite destination="website" />
      </div>

      {activeModal === "book" && (
        <Modal title="Journal" onClose={() => setActiveModal(null)}>
          <p>This book contains information about me, my work, and hidden secrets throughout the map.</p>
        </Modal>
      )}

      {eggs === TOTAL_EGGS && (
        <Modal title="Secret Unlocked" onClose={() => setEggs(eggs)}>
          <p>You found all the Easter eggs 👀</p>
        </Modal>
      )}
    </>
  );
}
