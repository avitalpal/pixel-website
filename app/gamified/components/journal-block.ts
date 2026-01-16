export type JournalBlock =
  | { type: "text"; value: string }
  | { type: "image"; src: string; alt?: string }
  | { type: "link"; href: string; label: string };
