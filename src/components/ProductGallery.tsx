"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/data/products";

export default function ProductGallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const active = product.images[index];

  return (
    <div className="lg:sticky lg:top-28">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink-soft">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active.label}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{
                objectPosition: active.position ?? "center",
                transform: `scale(${active.scale ?? 1})`,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {product.isNew && (
          <span className="absolute left-4 top-4 bg-bone px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
            New
          </span>
        )}
        {product.isSale && (
          <span className="absolute right-4 top-4 bg-crimson px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            Sale
          </span>
        )}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {product.images.map((image, imageIndex) => (
          <button
            key={image.label}
            type="button"
            onClick={() => setIndex(imageIndex)}
            aria-label={`View ${image.label} view`}
            aria-current={index === imageIndex}
            className={`relative aspect-square overflow-hidden border transition-colors ${
              index === imageIndex
                ? "border-crimson"
                : "border-white/10 hover:border-white/40"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="120px"
              className="object-cover"
              style={{
                objectPosition: image.position ?? "center",
                transform: `scale(${image.scale ?? 1})`,
              }}
            />
            <span className="absolute bottom-1 left-1 bg-black/70 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.16em] text-white">
              {image.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
