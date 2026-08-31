"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/data/products";
import { discountPercent, formatPrice } from "@/lib/format";
import { useHydrated, useWishlistStore } from "@/lib/store";
import { effectivePrice } from "@/data/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  sizes?: string;
}

export default function ProductCard({
  product,
  priority = false,
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
}: ProductCardProps) {
  const wishlist = useWishlistStore((state) => state.ids);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const hydrated = useHydrated();
  const saved = hydrated && wishlist.includes(product.id);
  const discount = discountPercent(product.price, product.salePrice);

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden bg-ink-soft"
        aria-label={`View ${product.name}`}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={sizes}
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-bone px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-ink">
              New
            </span>
          )}
          {product.isSale && product.salePrice && (
            <span className="bg-crimson px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white">
              Sale
            </span>
          )}
          {discount > 0 && (
            <span className="border border-white/25 bg-black/60 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-bone">
              -{discount}%
            </span>
          )}
        </div>

        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-crimson py-3 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-white transition-transform duration-300 group-hover:translate-y-0">
          View Drop
        </span>
      </Link>

      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        aria-pressed={saved}
        className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border backdrop-blur transition-all duration-300 ${
          saved
            ? "border-crimson bg-crimson text-white"
            : "border-white/20 bg-black/40 text-bone hover:border-crimson hover:text-crimson"
        }`}
      >
        <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
      </button>

      <div className="flex flex-1 flex-col gap-1 pt-4">
        <p className="text-[10px] uppercase tracking-[0.24em] text-mist">
          {product.category}
        </p>
        <h3 className="font-display text-lg uppercase leading-tight tracking-wide sm:text-xl">
          <Link
            href={`/product/${product.slug}`}
            className="transition-colors hover:text-crimson-soft"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-1 flex items-center gap-2.5">
          {product.salePrice ? (
            <>
              <span className="text-sm font-semibold text-crimson-soft">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-xs text-mist line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold">
              {formatPrice(effectivePrice(product))}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="skeleton aspect-[4/5] w-full" />
      <div className="skeleton mt-4 h-3 w-20" />
      <div className="skeleton mt-2 h-5 w-3/4" />
      <div className="skeleton mt-2 h-4 w-16" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
