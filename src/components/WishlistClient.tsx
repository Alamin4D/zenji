"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, X } from "lucide-react";
import { products } from "@/data/products";
import { effectivePrice } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useHydrated, useWishlistStore } from "@/lib/store";

export default function WishlistClient() {
  const hydrated = useHydrated();
  const ids = useWishlistStore((state) => state.ids);
  const remove = useWishlistStore((state) => state.remove);
  const clear = useWishlistStore((state) => state.clear);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
          {[0, 1].map((index) => (
            <div key={index} className="skeleton aspect-[4/5] w-full" />
          ))}
        </div>
      </div>
    );
  }

  const saved = products.filter((product) => ids.includes(product.id));

  if (saved.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <span className="grid h-20 w-20 place-items-center rounded-full border border-white/15">
          <Heart className="h-8 w-8 text-mist" />
        </span>
        <h2 className="mt-8 font-display text-3xl uppercase tracking-wide sm:text-4xl">
          No pieces saved yet
        </h2>
        <p className="mt-3 text-sm text-mist">
          Tap the heart on any product to keep it here for later.
        </p>
        <Link
          href="/shop"
          className="mt-8 bg-bone px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-colors hover:bg-crimson hover:text-white"
        >
          Browse the archive
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.2em] text-mist">
          {saved.length} {saved.length === 1 ? "piece" : "pieces"} saved
        </p>
        <button
          type="button"
          onClick={clear}
          className="text-xs uppercase tracking-[0.22em] text-mist underline decoration-white/25 underline-offset-4 transition-colors hover:text-crimson"
        >
          Clear wishlist
        </button>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
        {saved.map((product) => (
          <li key={product.id} className="group relative flex flex-col">
            <Link
              href={`/product/${product.slug}`}
              className="relative block aspect-[4/5] overflow-hidden bg-ink-soft"
            >
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
              />
            </Link>
            <button
              type="button"
              onClick={() => remove(product.id)}
              aria-label={`Remove ${product.name} from wishlist`}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-crimson bg-crimson text-white transition-colors hover:bg-crimson-soft"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="pt-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-mist">
                {product.category}
              </p>
              <h2 className="mt-1 font-display text-lg uppercase tracking-wide">
                <Link
                  href={`/product/${product.slug}`}
                  className="transition-colors hover:text-crimson-soft"
                >
                  {product.name}
                </Link>
              </h2>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-semibold">
                  {formatPrice(effectivePrice(product))}
                </span>
                <Link
                  href={`/product/${product.slug}`}
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-mist transition-colors hover:text-crimson-soft"
                >
                  View
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
