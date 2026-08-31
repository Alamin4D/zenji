"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { effectivePrice, products } from "@/data/products";
import { formatPrice } from "@/lib/format";

interface Tile {
  src: string;
  alt: string;
  title: string;
  caption: string;
  span: string;
  slug?: string;
}

const tiles: Tile[] = [
  {
    src: "/images/hero.jpg",
    alt: "Models wearing ZENJI oversized streetwear on a neon Tokyo backstreet",
    title: "Crimson Samurai",
    caption: "Drop 04 campaign — shot on location in Tokyo",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/lookbook/look-33838904.jpg",
    alt: "Editorial portrait of a model on a neon-lit city street at night",
    title: "Neon Silhouette",
    caption: "Drop 04 editorial · Night city",
    span: "md:row-span-2",
  },
  {
    src: "/images/products/crimson-samurai-hoodie.jpg",
    alt: "Crimson Samurai Hoodie",
    title: "Crimson Samurai Hoodie",
    caption: "Drop 04 · Hoodies",
    span: "",
    slug: "crimson-samurai-hoodie",
  },
  {
    src: "/images/lookbook/look-10380589.jpg",
    alt: "Dramatic nighttime fashion portrait in an urban setting",
    title: "After Hours",
    caption: "Drop 04 editorial · After hours",
    span: "",
  },
  {
    src: "/images/products/katana-zip-jacket.jpg",
    alt: "Katana Zip Jacket",
    title: "Katana Zip Jacket",
    caption: "Drop 04 · Outerwear",
    span: "",
    slug: "katana-zip-jacket",
  },
  {
    src: "/images/lookbook/look-13613530.jpg",
    alt: "Moody fashion portrait under neon street lighting",
    title: "Rain District",
    caption: "Drop 03 editorial · Rain district",
    span: "",
  },
  {
    src: "/images/products/blue-flame-tee.jpg",
    alt: "Blue Flame Tee",
    title: "Blue Flame Tee",
    caption: "Drop 04 · Tees",
    span: "",
    slug: "blue-flame-tee",
  },
  {
    src: "/images/lookbook/look-1760699.jpg",
    alt: "Model in urban night fashion on a vibrant city street",
    title: "Shinjuku 2AM",
    caption: "Drop 03 editorial · Shinjuku 2AM",
    span: "md:col-span-2",
  },
  {
    src: "/images/products/oni-mask-tee.jpg",
    alt: "Oni Mask Tee",
    title: "Oni Mask Tee",
    caption: "Drop 03 · Tees",
    span: "md:row-span-2",
    slug: "oni-mask-tee",
  },
  {
    src: "/images/products/shogun-cargo-pants.jpg",
    alt: "Shogun Cargo Pants",
    title: "Shogun Cargo Pants",
    caption: "Drop 03 · Bottoms",
    span: "",
    slug: "shogun-cargo-pants",
  },
  {
    src: "/images/products/zenji-kanji-tee.jpg",
    alt: "Zenji Kanji Tee",
    title: "Zenji Kanji Tee",
    caption: "Drop 04 · Tees",
    span: "",
    slug: "zenji-kanji-tee",
  },
  {
    src: "/images/products/neon-tokyo-jersey.jpg",
    alt: "Neon Tokyo Jersey",
    title: "Neon Tokyo Jersey",
    caption: "Drop 03 · Jerseys",
    span: "md:col-span-2",
    slug: "neon-tokyo-jersey",
  },
  {
    src: "/images/products/rising-sun-cap.jpg",
    alt: "Rising Sun Cap",
    title: "Rising Sun Cap",
    caption: "Drop 03 · Accessories",
    span: "",
    slug: "rising-sun-cap",
  },
  {
    src: "/images/products/hannya-beanie.jpg",
    alt: "Hannya Beanie",
    title: "Hannya Beanie",
    caption: "Drop 03 · Accessories",
    span: "",
    slug: "hannya-beanie",
  },
];

export default function LookbookGallery() {
  const [active, setActive] = useState<Tile | null>(null);

  return (
    <>
      <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:auto-rows-[240px] sm:grid-cols-2 lg:auto-rows-[280px] lg:grid-cols-3">
        {tiles.map((tile) => (
          <button
            key={tile.title}
            type="button"
            onClick={() => setActive(tile)}
            aria-label={`Open ${tile.title} in lightbox`}
            className={`group relative overflow-hidden bg-ink-soft ${tile.span}`}
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-display text-xl uppercase tracking-wide sm:text-2xl">
                {tile.title}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-mist">
                {tile.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <motion.figure
              className="relative z-10 max-h-full w-full max-w-4xl overflow-hidden bg-ink-soft"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  sizes="(min-width: 1024px) 900px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-5">
                <div>
                  <p className="font-display text-2xl uppercase tracking-wide">
                    {active.title}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-mist">
                    {active.caption}
                  </p>
                </div>
                {(() => {
                  const product = products.find(
                    (item) => item.slug === active.slug,
                  );
                  if (!product) return null;
                  return (
                    <a
                      href={`/product/${product.slug}`}
                      className="bg-crimson px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-crimson-soft"
                    >
                      Shop — {formatPrice(effectivePrice(product))}
                    </a>
                  );
                })()}
              </figcaption>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close image"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white transition-colors hover:bg-crimson"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
