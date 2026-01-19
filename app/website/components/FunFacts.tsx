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

  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">{data.title}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-stone-100 p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => toggleCard(idx)}
          >
            <h3 className="text-xl font-semibold mb-2">{card.subtitle}</h3>
            {expanded === idx && <p className="mt-2">{card.content}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
