export type InventoryItem = {
    name: string;
    action: () => void;
    description?: string;
};

// All valid inventory IDs
export const INVENTORY_PICKUPS = [
    { key: "inventory/github", x: 420, y: 500 },
    { key: "inventory/linkedin", x: 520, y: 500 },
    { key: "inventory/mail", x: 620, y: 500 },
    { key: "inventory/scroll", x: 720, y: 500 },
] as const;

export type InventoryItemId = typeof INVENTORY_PICKUPS[number]["key"];

export const INVENTORY_ITEM_REGISTRY: Record<InventoryItemId, InventoryItem> = {
    "inventory/github": {
        name: "inventory/github",
        action: () => {
            window.open("https://github.com/avitalpal", "_blank");
        },
        description: "visit my GitHub",
    },
    "inventory/linkedin": {
        name: "inventory/linkedin",
        action: () => {
            window.open("https://www.linkedin.com/in/avital-palchik/", "_blank");
        },
        description: "visit my LinkedIn",
    },
    "inventory/mail": {
        name: "inventory/mail",
        action: () => {
            window.open("mailto:avital.palchik@uwaterloo.ca");
        },
        description: "contact me",
    },
    "inventory/scroll": {
        name: "inventory/scroll",
        action: () => {
            // Create a temporary link element
            const link = document.createElement('a');

            link.href = '/AvitalPalchikResumeJan2026.pdf';

            // This tells the browser to download instead of navigate
            link.download = 'AvitalPalchik_Resume.pdf';

            // Append, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        description: "download my resume",
    },
};