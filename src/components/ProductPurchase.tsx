"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product, Size } from "@/data/products";
import { effectivePrice } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCartStore, useHydrated, useUiStore, useWishlistStore } from "@/lib/store";

export default function ProductPurchase({ product }: { product: Product }) {
  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useUiStore((state) => state.openCart);
  const wishlist = useWishlistStore((state) => state.ids);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const hydrated = useHydrated();
  const router = useRouter();

  const saved = hydrated && wishlist.includes(product.id);

  const addToCart = () => {
    if (!size) {
      setError("Select a size to continue.");
      return false;
    }
    setError(null);
    addItem({
      slug: product.slug,
      name: product.name,
      size,
      quantity,
      unitPrice: effectivePrice(product),
      image: product.images[0].src,
      category: product.category,
    });
    return true;
  };

  const handleAdd = () => {
    if (addToCart()) openCart();
  };

  const handleBuyNow = () => {
    if (addToCart()) router.push("/checkout");
  };

  return (
    <div>
      <div className="flex items-end gap-3">
        {product.salePrice ? (
          <>
            <span className="font-display text-4xl text-crimson-soft">
              {formatPrice(product.salePrice)}
            </span>
            <span className="pb-1 text-base text-mist line-through">
              {formatPrice(product.price)}
            </span>
            <span className="mb-1.5 border border-crimson px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-crimson-soft">
              Sale
            </span>
          </>
        ) : (
          <span className="font-display text-4xl">
            {formatPrice(product.price)}
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-mist">
        {product.colorway} · incl. GST · Free AU shipping over A$150
      </p>

      {/* Sizes */}
      <fieldset className="mt-8">
        <legend className="flex w-full items-center justify-between text-[11px] font-bold uppercase tracking-[0.24em]">
          <span>Select size</span>
          <button
            type="button"
            className="text-[10px] font-medium normal-case tracking-normal text-mist underline decoration-white/30 underline-offset-4 hover:text-bone"
          >
            Size guide
          </button>
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.sizes.map((option) => {
            const soldOut = product.soldOutSizes.includes(option);
            const active = size === option;
            return (
              <button
                key={option}
                type="button"
                disabled={soldOut}
                aria-pressed={active}
                onClick={() => {
                  setSize(option);
                  setError(null);
                }}
                className={`relative h-12 min-w-[58px] border px-4 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-200 ${
                  soldOut
                    ? "cursor-not-allowed border-white/10 text-mist/40"
                    : active
                      ? "border-crimson bg-crimson text-white"
                      : "border-white/20 text-bone hover:border-bone"
                }`}
              >
                {option}
                {soldOut && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-px w-full rotate-[20deg] bg-white/20" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {error && (
          <p role="alert" className="mt-3 text-xs text-crimson-soft">
            {error}
          </p>
        )}
      </fieldset>

      {/* Quantity */}
      <div className="mt-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em]">
          Quantity
        </p>
        <div className="mt-4 inline-flex items-center border border-white/20">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            aria-label="Decrease quantity"
            className="grid h-12 w-12 place-items-center text-mist transition-colors hover:text-bone"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span
            aria-live="polite"
            aria-label={`Quantity ${quantity}`}
            className="w-12 text-center text-sm font-semibold tabular-nums"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(10, value + 1))}
            aria-label="Increase quantity"
            className="grid h-12 w-12 place-items-center text-mist transition-colors hover:text-bone"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAdd}
          className="group inline-flex flex-1 items-center justify-center gap-3 bg-crimson px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-crimson-soft"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </button>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={saved}
          className={`inline-flex items-center justify-center gap-3 border px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] transition-colors ${
            saved
              ? "border-crimson text-crimson"
              : "border-white/20 text-bone hover:border-bone"
          }`}
        >
          <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
          {saved ? "Saved" : "Wishlist"}
        </button>
      </div>

      <button
        type="button"
        onClick={handleBuyNow}
        className="mt-3 w-full border border-bone bg-bone px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-colors hover:bg-crimson hover:text-white hover:border-crimson"
      >
        Buy it now
      </button>

      <dl className="mt-8 space-y-3 border-t border-white/10 pt-6 text-xs text-mist">
        <div className="flex justify-between gap-4">
          <dt className="uppercase tracking-[0.18em]">Fit</dt>
          <dd className="text-right text-bone">{product.fit}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="uppercase tracking-[0.18em]">Material</dt>
          <dd className="text-right text-bone">{product.material}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="uppercase tracking-[0.18em]">Released</dt>
          <dd className="text-right text-bone">
            {new Date(product.releaseDate).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </dd>
        </div>
      </dl>
    </div>
  );
}
