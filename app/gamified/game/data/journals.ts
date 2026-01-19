import type { JournalBlock } from "../../components/journal-block"

const journalData = {
  hj1: {
    title: "Welcome",
    content: [
      { type: "text", value: "Welcome to the world." },
      { type: "text", value: "Use WASD or arrow keys to move." },
    ],
  },
  hj2: {
    title: "Resources",
    content: [
      { type: "text", value: "Useful links:" },
      { type: "link", label: "My Website", href: "https://example.com" },
    ],
  },
  hj3: {
    title: "Visual Log",
    content: [
      { type: "image", src: "/images/map.png", alt: "Map" },
      { type: "text", value: "This map shows the full area." },
    ],
  },
  hj4: {
    title: "Final Note",
    content: [
      { type: "text", value: "You've made it this far!" },
    ],
  },
  hj5: {
    title: "Secret Journal",
    content: [
      { type: "text", value: "You found the secret journal!" },
      { type: "image", src: "/images/secret.png", alt: "Secret Image" },
    ],
  },
  hj6: {
    title: "Easter Egg",
    content: [
      { type: "text", value: "Congratulations on finding this Easter egg!" },
      { type: "link", label: "Celebrate Here", href: "https://example.com/celebrate" },
    ],
  },
  hj7: {
    title: "Hidden Treasure",
    content: [
      { type: "text", value: "You've uncovered the hidden treasure journal!" },
      { type: "image", src: "/images/treasure.png", alt: "Treasure Image" },
    ],
  },
} as const satisfies Record<
  string,
  { title: string; content: readonly JournalBlock[] }
>;

export default journalData;
