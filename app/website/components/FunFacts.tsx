"use client";
import React, { useState } from "react";

type FunFactCard = {
  subtitle: string;
  content: string;
};

type FunFactsProps = {
  title: string;
  facts: {
    card1: FunFactCard;
    card2: FunFactCard;
    card3: FunFactCard;
    card4: FunFactCard;
  };
};

export default function FunFacts({ data }: { data: FunFactsProps }) {
  const cards = [data.facts.card1, data.facts.card2, data.facts.card3, data.facts.card4];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-12 text-blue-600">
        {data.title}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <FunFactCardComponent key={idx} card={card} index={idx} />
        ))}
      </div>
    </div>
  );
}

function FunFactCardComponent({ card, index }: { card: FunFactCard; index: number }) {
  const [expanded, setExpanded] = useState(false);

  const colors = [
    { bg: "bg-fuchsia-50", accent: "text-fuchsia-600", border: "border-fuchsia-300", icon: "🎨" },
    { bg: "bg-cyan-50", accent: "text-cyan-600", border: "border-cyan-300", icon: "💡" },
    { bg: "bg-green-50", accent: "text-green-600", border: "border-green-300", icon: "🎭" },
    { bg: "bg-rose-50", accent: "text-rose-600", border: "border-rose-300", icon: "🌟" },
  ];

  const colorScheme = colors[index % colors.length];

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`relative ${colorScheme.bg} rounded-xl shadow-lg cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 ${colorScheme.border}`}
    >
      {/* Decorative background gradient */}
      <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full -mr-16 -mt-16 transition-transform duration-300 group-hover:scale-150`} />

      {/* Content */}
      <div className="relative px-8 p-4 z-10">
        {/* Header with icon and subtitle */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className={`text-3xl mb-2`}>{colorScheme.icon}</p>
            <h3 className={`text-xl font-bold text-stone-700`}>
              {card.subtitle}
            </h3>
          </div>
          <span
            className={`text-3xl font-light transition-transform duration-300 ${colorScheme.accent} ${
              expanded ? "rotate-90" : "rotate-0"
            }`}
          >
            ➜
          </span>
        </div>

        {/* Expandable content */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className={`pt-4 border-t-2 ${colorScheme.border}`}>
            <p className="text-stone-800 leading-relaxed text-md">
              {card.content}
            </p>
          </div>
        </div>

        {/* Subtle expand hint */}
        {!expanded && (
          <p className={`text-xs ${colorScheme.accent} opacity-60 mt-3 font-medium`}>
            Click to discover...
          </p>
        )}
      </div>

      {/* Bottom accent bar */}
      <div
        className={`h-1 bg-linear-to-r from-transparent via-${colorScheme.accent.split('-')[1]}-400 to-transparent`}
      />
    </div>
  );
}