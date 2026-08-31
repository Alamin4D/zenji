import WishlistClient from "@/components/WishlistClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved ZENJI pieces.",
};

export default function WishlistPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-ink-soft">
        <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-crimson">
            Saved
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.25rem,7vw,5rem)] uppercase leading-[0.9] tracking-tight">
            Wishlist
          </h1>
        </div>
      </section>
      <WishlistClient />
    </>
  );
}
