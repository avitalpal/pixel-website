"use client";
import React, { useState, useEffect } from "react";
import SwitchSite from "@/app/shared-components/SwitchSite";

type NavItem = {
  home: string;
  about: string;
  projects: string;
  funFacts: string;
  contact: string;
};

export default function Navbar({ data }: { data: NavItem }) {
  const navItems = [
    { label: data.home, href: "#home", id: "home" },
    { label: data.about, href: "#about", id: "about" },
    { label: data.projects, href: "#projects", id: "projects" },
    { label: data.funFacts, href: "#funFacts", id: "funFacts" },
    { label: data.contact, href: "#contact", id: "contact" },
  ];

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // offset for fixed navbar

      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(item.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <nav className="bg-blue-50 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="text-2xl font-bold text-stone-800">Avital Palchik</div>
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`font-semibold transition-colors ${
                  activeSection === item.id
                    ? "text-blue-600 underline"
                    : "text-stone-800 hover:scale-110 hover:text-blue-600 transition-transform duration-300"
                }`}
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
