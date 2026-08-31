"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/format";
import {
  useCartStore,
  useCartTotals,
  useHydrated,
} from "@/lib/store";

export default function CartClient() {
  const hydrated = useHydrated();
  const { items, subtotal, shipping, total, savings, count } = useCartTotals();
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex gap-5 border-b border-white/5 pb-6">
                <div className="skeleton h-32 w-28 shrink-0" />
                <div className="flex-1 space-y-3 py-2">
                  <div className="skeleton h-5 w-1/2" />
                  <div className="skeleton h-3 w-24" />
                  <div className="skeleton h-8 w-28" />
                </div>
              </div>
            ))}
          </div>
          <div className="skeleton h-64 w-full" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <span className="grid h-20 w-20 place-items-center rounded-full border border-white/15">
          <ShoppingBag className="h-8 w-8 text-mist" />
        </span>
        <h2 className="mt-8 font-display text-3xl uppercase tracking-wide sm:text-4xl">
          Your cart is empty
        </h2>
        <p className="mt-3 text-sm text-mist">
          Nothing claimed yet. Drop 04 is still live — 250 pieces, no restocks.
        </p>
        <Link
          href="/shop"
          className="mt-8 bg-bone px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-colors hover:bg-crimson hover:text-white"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
      <p className="text-xs uppercase tracking-[0.2em] text-mist">
        {count} {count === 1 ? "item" : "items"} in your cart
      </p>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <div>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {items.map((line) => (
              <li
                key={line.id}
                className="flex flex-col gap-5 py-6 sm:flex-row sm:gap-6"
              >
                <Link
                  href={`/product/${line.slug}`}
                  className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-ink-soft sm:w-32"
                >
                  <Image
                    src={line.image}
                    alt={line.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/product/${line.slug}`}
                        className="font-display text-xl uppercase tracking-wide hover:text-crimson-soft sm:text-2xl"
                      >
                        {line.name}
                      </Link>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-mist">
                        {line.category} · Size {line.size}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.id)}
                      aria-label={`Remove ${line.name} from cart`}
                      className="grid h-9 w-9 shrink-0 place-items-center border border-white/15 text-mist transition-colors hover:border-crimson hover:text-crimson"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
                    <div className="inline-flex items-center border border-white/20">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.id, line.quantity - 1)}
                        aria-label={`Decrease quantity of ${line.name}`}
                        className="grid h-10 w-10 place-items-center text-mist transition-colors hover:text-bone"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold tabular-nums">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.id, line.quantity + 1)}
                        aria-label={`Increase quantity of ${line.name}`}
                        className="grid h-10 w-10 place-items-center text-mist transition-colors hover:text-bone"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl">
                        {formatPrice(line.unitPrice * line.quantity)}
                      </p>
                      <p className="text-[11px] text-mist">
                        {formatPrice(line.unitPrice)} each
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/shop"
              className="text-xs font-bold uppercase tracking-[0.22em] text-mist transition-colors hover:text-bone"
            >
              ← Continue shopping
            </Link>
            <button
              type="button"
              onClick={() => useCartStore.getState().clearCart()}
              className="text-xs uppercase tracking-[0.22em] text-mist underline decoration-white/25 underline-offset-4 transition-colors hover:text-crimson"
            >
              Clear cart
            </button>
          </div>
        </div>

        <aside className="h-fit border border-white/10 bg-ink-soft p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-2xl uppercase tracking-wide">
            Order Summary
          </h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-mist">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-crimson-soft">
                <dt>You save</dt>
                <dd>-{formatPrice(savings)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-mist">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <dt className="font-display text-lg uppercase tracking-wide">
                Total
              </dt>
              <dd className="font-display text-2xl text-crimson-soft">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>

          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center bg-crimson px-6 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-crimson-soft"
          >
            Checkout
          </Link>
          <p className="mt-4 text-center text-[11px] leading-relaxed text-mist">
            Taxes calculated at checkout. Free AU shipping over A$150.
          </p>
        </aside>
      </div>
    </div>
  );
}
