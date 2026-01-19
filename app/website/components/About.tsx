import React from "react";

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
      <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
      <p className="mb-8">{data.subtitle}</p>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-stone-100 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="mb-4">{card.content}</p>
            <h4 className="font-medium mb-2">{card.prioritiesDetail.title}</h4>
            <ul className="list-disc list-inside space-y-1">
              {card.prioritiesDetail.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
