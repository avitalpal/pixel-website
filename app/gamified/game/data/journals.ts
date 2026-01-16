import type { JournalBlock } from "../../components/journal-block"

const journalData = {
  j1: {
    title: "Welcome",
    content: [
      { type: "text", value: "Welcome to the world." },
      { type: "text", value: "Use WASD or arrow keys to move." },
    ],
  },
  j2: {
    title: "Resources",
    content: [
      { type: "text", value: "Useful links:" },
      { type: "link", label: "My Website", href: "https://example.com" },
    ],
  },
  j3: {
    title: "Visual Log",
    content: [
      { type: "image", src: "/images/map.png", alt: "Map" },
      { type: "text", value: "This map shows the full area." },
    ],
  },
  j4: {
    title: "Final Note",
    content: [
      { type: "text", value: "You've made it this far!" },
    ],
  },
} as const satisfies Record<
  string,
  { title: string; content: readonly JournalBlock[] }
>;

export default journalData;
