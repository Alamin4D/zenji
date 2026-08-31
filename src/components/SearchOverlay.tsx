"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { effectivePrice } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useUiStore } from "@/lib/store";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUiStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
    setQuery("");
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter((product) =>
        [product.name, product.category, product.colorway, product.description]
          .join(" ")
          .toLowerCase()
          .includes(term),
      )
      .slice(0, 6);
  }, [query]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          role="dialog"
          aria-modal="true"
          aria-label="Search ZENJI"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          />
          <motion.div
            className="relative mx-auto mt-0 w-full border-b border-white/10 bg-ink-soft px-4 pb-8 pt-6 sm:px-6"
            initial={{ y: -40 }}
            animate={{ y: 0 }}
            exit={{ y: -40 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <form
              onSubmit={submit}
              className="mx-auto flex max-w-3xl items-center gap-3 border-b border-white/20 pb-3"
              role="search"
            >
              <Search className="h-5 w-5 shrink-0 text-mist" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search drops, tees, samurai…"
                aria-label="Search products"
                className="w-full bg-transparent text-lg text-bone placeholder:text-mist/70 focus:outline-none sm:text-2xl"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="grid h-9 w-9 place-items-center rounded-full text-mist hover:bg-white/5 hover:text-bone"
              >
                <X className="h-5 w-5" />
              </button>
            </form>

            <div className="mx-auto max-w-3xl">
              {query.trim().length > 0 && results.length === 0 && (
                <p className="pt-8 text-sm text-mist">
                  No products found for “{query}”.
                </p>
              )}

              {results.length > 0 && (
                <ul className="divide-y divide-white/5 pt-4">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="group flex items-center gap-4 py-3"
                      >
                        <span className="relative h-16 w-16 shrink-0 overflow-hidden bg-ink">
                          <Image
                            src={product.images[0].src}
                            alt={product.images[0].alt}
                            fill
                            sizes="64px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-lg uppercase tracking-wide text-bone">
                            {product.name}
                          </span>
                          <span className="text-xs uppercase tracking-[0.2em] text-mist">
                            {product.category}
                          </span>
                        </span>
                        <span className="text-sm font-semibold text-crimson-soft">
                          {formatPrice(effectivePrice(product))}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {query.trim().length === 0 && (
                <div className="pt-8">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-mist">
                    Popular searches
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Blue", "Samurai", "Oni", "Cargo", "Katana", "Cap"].map(
                      (term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setQuery(term)}
                          className="border border-white/15 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-mist transition-colors hover:border-crimson hover:text-bone"
                        >
                          {term}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
