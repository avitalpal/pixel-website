import "./globals.css";
import { ReactNode } from "react";

// Optional: Google Pixel font
export const metadata = {
  title: "Avital's Portfolio",
  description: "A pixel-style website and gamified mode",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="flex-1 w-full">{children}</main>
      </body>
    </html>
  );
}
