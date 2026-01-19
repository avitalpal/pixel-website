import React from "react";
import SwitchSite from "@/app/shared-components/SwitchSite";

type NavItem = {
  home: string;
  about: string;
  projects: string;
  funFacts: string;
  contact: string;
};

type NavbarProps = {
  data: NavItem;
};

export default function Navbar({ data }: { data: NavItem }) {
  const navItems = [
    { label: data.home, href: "#home" },
    { label: data.about, href: "#about" },
    { label: data.projects, href: "#projects" },
    { label: data.funFacts, href: "#funFacts" },
    { label: data.contact, href: "#contact" },
  ];

  return (
    <nav className="bg-stone-200 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="text-2xl font-bold text-stone-800">
            Avital Palchik
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="text-stone-800 hover:text-blue-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <SwitchSite destination="gamified" />
          </div>
        </div>
      </div>
    </nav>
  );
}
