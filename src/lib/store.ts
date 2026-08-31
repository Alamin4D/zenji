"use client";

import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Size } from "@/data/products";
import { effectivePrice, getProductBySlug } from "@/data/products";

export interface CartItem {
  /** product slug + selected size keeps lines unique */
  id: string;
  slug: string;
  name: string;
  size: Size;
  quantity: number;
  unitPrice: number;
  image: string;
  category: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">, maxQuantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clearCart: () => void;
}

const MAX_PER_LINE = 10;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, maxQuantity = MAX_PER_LINE) => {
        const id = `${item.slug}__${item.size}`;
        const existing = get().items.find((line) => line.id === id);
        if (existing) {
          set({
            items: get().items.map((line) =>
              line.id === id
                ? {
                    ...line,
                    quantity: Math.min(line.quantity + item.quantity, maxQuantity),
                  }
                : line,
            ),
          });
          return;
        }
        set({ items: [...get().items, { ...item, id }] });
      },
      removeItem: (id) =>
        set({ items: get().items.filter((line) => line.id !== id) }),
      setQuantity: (id, quantity) =>
        set({
          items: get().items.flatMap((line) => {
            if (line.id !== id) return [line];
            if (quantity <= 0) return [];
            return [{ ...line, quantity: Math.min(quantity, MAX_PER_LINE) }];
          }),
        }),
      increment: (id) =>
        set({
          items: get().items.map((line) =>
            line.id === id
              ? { ...line, quantity: Math.min(line.quantity + 1, MAX_PER_LINE) }
              : line,
          ),
        }),
      decrement: (id) =>
        set({
          items: get().items.flatMap((line) => {
            if (line.id !== id) return [line];
            return line.quantity <= 1
              ? []
              : [{ ...line, quantity: line.quantity - 1 }];
          }),
        }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "zenji-cart",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

interface WishlistState {
  ids: string[];
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set({
          ids: get().ids.includes(id)
            ? get().ids.filter((item) => item !== id)
            : [...get().ids, id],
        }),
      remove: (id) => set({ ids: get().ids.filter((item) => item !== id) }),
      clear: () => set({ ids: [] }),
    }),
    {
      name: "zenji-wishlist",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

interface UiState {
  cartOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setSearchOpen: (open: boolean) => void;
  setMenuOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  menuOpen: false,
  openCart: () => set({ cartOpen: true, searchOpen: false, menuOpen: false }),
  closeCart: () => set({ cartOpen: false }),
  setSearchOpen: (searchOpen) =>
    set({ searchOpen, menuOpen: false, cartOpen: false }),
  setMenuOpen: (menuOpen) =>
    set({ menuOpen, searchOpen: false, cartOpen: false }),
}));

/* ---------------------------------- hooks --------------------------------- */

/** Guards against hydration mismatches for persisted (localStorage) state. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

export function useCartTotals() {
  const items = useCartStore((state) => state.items);
  const subtotal = items.reduce(
    (total, line) => total + line.unitPrice * line.quantity,
    0,
  );
  const count = items.reduce((total, line) => total + line.quantity, 0);
  const savings = items.reduce((total, line) => {
    const product = getProductBySlug(line.slug);
    if (!product?.salePrice) return total;
    return total + (product.price - effectivePrice(product)) * line.quantity;
  }, 0);
  const shipping = subtotal === 0 || subtotal >= 150 ? 0 : 9.95;
  return { items, subtotal, count, savings, shipping, total: subtotal + shipping };
}
