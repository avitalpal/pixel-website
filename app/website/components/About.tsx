"use client";
import React, { useState } from "react";

type Card = {
  title: string;
  content: string;
  prioritiesDetail: {
    title: string;
    list: string[];
  };
};

type AboutProps = {
  title: string;
  subtitle: string;
  card1: Card;
  card2: Card;
  card3: Card;
};

export default function About({ data }: { data: AboutProps }) {
  const cards = [data.card1, data.card2, data.card3];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">{data.title}</h2>
      <p className="mb-6 text-stone-800 leading-relaxed">{data.subtitle}</p>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <InteractiveCard key={idx} card={card} colorIndex={idx} />
        ))}
      </div>
    </div>
  );
}

function InteractiveCard({ card, colorIndex }: { card: Card; colorIndex: number }) {
  const [open, setOpen] = useState(false);

  // Color palette for cards
  const colors = [
    { bg: "bg-purple-50", accent: "text-purple-600", border: "border-purple-200" },
    { bg: "bg-emerald-50", accent: "text-emerald-600", border: "border-emerald-200" },
    { bg: "bg-amber-50", accent: "text-amber-600", border: "border-amber-200" },
  ];
  
  const colorScheme = colors[colorIndex % colors.length];

  return (
    <div className={`relative ${colorScheme.bg} text-stone-800 rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-l-4 ${colorScheme.border}`}>
      {/* Header */}
      <div
        className="p-6 flex justify-between items-start gap-4 min-h-24"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${colorScheme.accent}`}>{card.title}</h3>
        </div>
        <span
          className={`shrink-0 text-2xl font-light transform transition-transform duration-300 origin-center ${colorScheme.accent} ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </div>

      {/* Collapsible content */}
      <div
        className={`px-6 py-6 overflow-hidden transition-all duration-500 border-t ${colorScheme.border} ${
          open ? "max-h-104 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Main content with better formatting */}
        <div className="mb-5 space-y-3 text-sm font-semibold leading-relaxed">
          <p className="text-stone-700">
            {card.content.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < card.content.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Priorities section with icon and styling */}
        <div className="pt-4 border-t border-stone-300">
          <h4 className={`font-bold text-md mb-3 flex items-center gap-2 ${colorScheme.accent}`}>
            <span className="text-lg">✓</span>
            {card.prioritiesDetail.title}
          </h4>
          <ul className="space-y-2">
            {card.prioritiesDetail.list.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-stone-700">
                <span className={`shrink-0 font-bold ${colorScheme.accent}`}>→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}