import type { JournalBlock } from "../../components/journal-block";

const journalData = {
  hj1: {
    title: "Who Am I?",
    content: [
      {
        type: "text",
        value:
          "Hi! I'm Avital Palchik — a Full-Stack Developer and Frontend Specialist studying Systems Design Engineering at the University of Waterloo.",
      },
      {
        type: "text",
        value:
          "I love building thoughtful, interactive web experiences and experimenting with creative UI ideas.",
      },
      {
        type: "text",
        value: "Stick around and explore as much as you'd like, and be sure to check out the regular website too!",
      },
    ],
  },

  hj2: {
    title: "About the Builder",
    content: [
      {
        type: "text",
        value:
          "I enjoy turning user needs into clean, scalable interfaces that feel intuitive and responsive.",
      },
      {
        type: "text",
        value:
          "Most of my work focuses on React, TypeScript, and modern frontend tooling, but I also bring a full-stack mindset to everything I build.",
      },
      {
        type: "text",
        value:
          "Accessibility, performance, and maintainability are always part of the plan, not afterthoughts.",
      },
    ],
  },

  hj3: {
    title: "Project Archive",
    content: [
      {
        type: "text",
        value:
          "I've worked on a mix of personal, academic, and team-based projects focused on frontend architecture, UI, and interactivity.",
      },
      {
        type: "text",
        value:
          "Gamified Website: A pixel-art style portfolio with an interactive game mode, built using React, Next.js, Phaser.js, and reusable UI components. You're looking at it right now!",
      },
      {
        type: "text",
        value:
          "UW Baja SAE: Led the frontend redesign for Waterloo’s Baja SAE team website, focusing on responsive UI, component reuse, and deployment via Netlify.",
      },
      {
        type: "link",
        label: "Visit Waterloo Baja SAE",
        href: "https://waterloobaja.ca/",
      },
      {
        type: "text",
        value:
          "Intro to Machine Learning: Completed during a study abroad term in Madrid, applying Python and scikit-learn to real datasets using classification and regression models.",
      },
      {
        type: "link",
        label: "View ML Projects on GitHub",
        href: "https://github.com/avitalpal/ml-fall-2025",
      },

      {
        type: "text",
        value:
          "More projects, experiments, and code live on my GitHub.",
      },
      {
        type: "link",
        label: "GitHub Profile",
        href: "https://github.com/avitalpal",
      },
    ],
  },

  hj4: {
    title: "Fun Facts",
    content: [
      {
        type: "text",
        value: "- I’ve saved over 4,200 songs on Spotify across 73 playlists",
      },
      {
        type: "text",
        value: "- I can solve a Rubik’s Cube in under a minute",
      },
      {
        type: "text",
        value:
          "- I make time for my hobbies: hockey, chess, video games, and (soon) drawing.",
      },
    ],
  },

  hj5: {
    title: "Get in Touch",
    content: [
      {
        type: "text",
        value:
          "I'm always open to chatting! Whether you want to collaborate, ask a question, or just say hi, feel free to reach out.",
      },
      {
        type: "link",
        label: "Email me",
        href: "mailto:avital.palchik@uwaterloo.ca",
      },
      {
        type: "link",
        label: "Connect on LinkedIn",
        href: "https://www.linkedin.com/in/avital-palchik/",
      },
    ],
  },

  // 🔓 Fun / Extra Journals

  hj6: {
    title: "Study Abroad Log",
    content: [
      {
        type: "text",
        value:
          "I recently spent 4 months studying abroad in Madrid, Spain",
      },
      {
        type: "text",
        value:
          "It was an incredible experience balancing travel, culture, and a machine learning course.",
      },
      {
        type: "text",
        value:
          "My Spanish though? …no son buenos :P",
      },
    ],
  },

  hj7: {
    title: "Developer Notes",
    content: [
      {
        type: "text",
        value:
          "If you’re reading this, you probably like exploring details... same here!",
      },
      {
        type: "text",
        value:
          "This site was built with reusability and playfulness in mind. UI should be functional *and* fun :]",
      },
    ],
  },
} as const satisfies Record<
  string,
  { title: string; content: readonly JournalBlock[] }
>;

export default journalData;
