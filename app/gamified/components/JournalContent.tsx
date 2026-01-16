"use client";

import type { JournalBlock } from "./journal-block";

export default function JournalContent({
  content,
}: {
  content: readonly JournalBlock[];
}) {
  return (
    <div className="flex flex-col gap-3 text-sm text-stone-800">
      {content.map((block, i) => {
        switch (block.type) {
          case "text":
            return <p key={i}>{block.value}</p>;

          case "image":
            return (
              <img
                key={i}
                src={block.src}
                alt={block.alt ?? ""}
                className="border-2 border-stone-800"
              />
            );

          case "link":
            return (
              <a
                key={i}
                href={block.href}
                target="_blank"
                className="underline text-blue-600"
              >
                {block.label}
              </a>
            );
        }
      })}
    </div>
  );
}
