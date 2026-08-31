import type { Metadata } from "next";
import type { ReactNode } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ZENJI — Anime-Inspired Streetwear",
    template: "%s — ZENJI",
  },
  description:
    "ZENJI is an independent anime-inspired streetwear label. Limited drops, heavyweight fabrics and samurai-grade storytelling from Melbourne.",
  keywords: [
    "streetwear",
    "anime streetwear",
    "ZENJI",
    "graphic tees",
    "hoodies",
    "limited drop",
  ],
  openGraph: {
    title: "ZENJI — Anime-Inspired Streetwear",
    description:
      "Limited drops, heavyweight fabrics and samurai-grade storytelling.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-bone antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-crimson focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-white"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <CartDrawer />
        <SearchOverlay />
      </body>
    </html>
  );
}
