import SwitchSite from "@/app/shared-components/SwitchSite";

export default function Footer() {
  return (
    <footer className="border-t border-stone-300 p-6 text-center text-sm text-stone-500 flex justify-between gap-2">
      © {new Date().getFullYear()} Avital Palchik. All rights reserved.
      <SwitchSite destination="gamified" />
    </footer>
  );
}
