import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alexander Vogel",
  description:
    "Personal portfolio of Alexander Vogel — literature enthusiast, athlete, and future entertainment industry leader.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        {/* SVG filter definition used by .torn-box utilities. Rendered once, invisible. */}
        <svg
          aria-hidden="true"
          width="0"
          height="0"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        >
          <defs>
            <filter id="torn-edge">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
            </filter>
          </defs>
        </svg>

        <Navigation />
        {children}
      </body>
    </html>
  );
}
