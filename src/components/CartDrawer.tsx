"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice } from "@/lib/format";
import {
  useCartStore,
  useCartTotals,
  useHydrated,
  useUiStore,
} from "@/lib/store";

export default function CartDrawer() {
  const { cartOpen, closeCart } = useUiStore();
  const { items, subtotal, count } = useCartTotals();
  const removeItem = useCartStore((state) => state.removeItem);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const hydrated = useHydrated();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen, closeCart]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-ink-soft"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 280 }}
          >
            <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="font-display text-xl uppercase tracking-[0.14em]">
                Your Cart
                <span className="ml-2 text-sm text-mist">
                  ({hydrated ? count : 0})
                </span>
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-full text-mist transition-colors hover:bg-white/5 hover:text-bone"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {!hydrated ? (
              <div className="flex-1 space-y-4 p-5">
                {[0, 1].map((index) => (
                  <div key={index} className="flex gap-4">
                    <div className="skeleton h-24 w-20" />
                    <div className="flex-1 space-y-2 py-1">
                      <div className="skeleton h-4 w-3/4" />
                      <div className="skeleton h-3 w-1/3" />
                      <div className="skeleton h-7 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full border border-white/10">
                  <ShoppingBag className="h-6 w-6 text-mist" />
                </span>
                <div>
                  <p className="font-display text-2xl uppercase tracking-wide">
                    Your cart is empty
                  </p>
                  <p className="mt-2 text-sm text-mist">
                    Nothing claimed yet. Drop 04 is still live.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="bg-bone px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-crimson hover:text-white"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-white/5 overflow-y-auto px-5">
                  {items.map((line) => (
                    <li key={line.id} className="flex gap-4 py-4">
                      <Link
                        href={`/product/${line.slug}`}
                        onClick={closeCart}
                        className="relative h-24 w-20 shrink-0 overflow-hidden bg-ink"
                      >
                        <Image
                          src={line.image}
                          alt={line.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <Link
                              href={`/product/${line.slug}`}
                              onClick={closeCart}
                              className="block truncate font-display text-base uppercase tracking-wide hover:text-crimson-soft"
                            >
                              {line.name}
                            </Link>
                            <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-mist">
                              Size {line.size}
                            </p>
                          </div>
                          <button
                            type="button"
                              onClick={() => removeItem(line.id)}
                            aria-label={`Remove ${line.name} from cart`}
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-mist transition-colors hover:bg-white/5 hover:text-crimson"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-white/15">
                            <button
                              type="button"
                              onClick={() => decrement(line.id)}
                              aria-label={`Decrease quantity of ${line.name}`}
                              className="grid h-8 w-8 place-items-center text-mist transition-colors hover:text-bone"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span
                              aria-live="polite"
                              className="w-8 text-center text-sm font-semibold tabular-nums"
                            >
                              {line.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => increment(line.id)}
                              aria-label={`Increase quantity of ${line.name}`}
                              className="grid h-8 w-8 place-items-center text-mist transition-colors hover:text-bone"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold tabular-nums">
                            {formatPrice(line.unitPrice * line.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-white/10 bg-ink px-5 py-5">
                  <div className="flex items-center justify-between text-sm text-mist">
                    <span className="uppercase tracking-[0.2em]">Subtotal</span>
                    <span className="font-display text-xl text-bone">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-mist">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="mt-4 flex w-full items-center justify-center bg-crimson px-6 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-crimson-soft"
                  >
                    Checkout
                  </Link>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-3 w-full py-2 text-xs uppercase tracking-[0.2em] text-mist transition-colors hover:text-bone"
                  >
                    Continue shopping
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


