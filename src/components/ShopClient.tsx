"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard, { ProductGridSkeleton } from "@/components/ProductCard";
import {
  CATEGORIES,
  filterOptions,
  products,
  sortOptions,
  sortProducts,
  type Category,
  type FilterKey,
  type SortKey,
} from "@/data/products";

interface ShopClientProps {
  initialQuery?: string;
  initialFilter?: FilterKey;
  initialCategory?: string;
  initialSort?: SortKey;
}

export default function ShopClient({
  initialQuery = "",
  initialFilter = "all",
  initialCategory = "all",
  initialSort = "featured",
}: ShopClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<FilterKey>(initialFilter);
  const [category, setCategory] = useState<string>(initialCategory);
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Simulated fetch so the skeleton UI is exercised like a real storefront.
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, [query, filter, category, sort]);

  // Keep the URL shareable without triggering a server round-trip.
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (filter !== "all") params.set("filter", filter);
    if (category !== "all") params.set("category", category);
    if (sort !== "featured") params.set("sort", sort);
    const search = params.toString();
    window.history.replaceState(
      null,
      "",
      search ? `/shop?${search}` : "/shop",
    );
  }, [query, filter, category, sort]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesTerm =
        !term ||
        [product.name, product.category, product.colorway, product.description]
          .join(" ")
          .toLowerCase()
          .includes(term);
      const matchesFilter =
        filter === "all" ||
        (filter === "new" && product.isNew) ||
        (filter === "sale" && product.isSale);
      const matchesCategory = category === "all" || product.category === category;
      return matchesTerm && matchesFilter && matchesCategory;
    });
    return sortProducts(filtered, sort);
  }, [query, filter, category, sort]);

  const reset = () => {
    setQuery("");
    setFilter("all");
    setCategory("all");
    setSort("featured");
  };

  const hasFilters =
    query.trim() !== "" ||
    filter !== "all" ||
    category !== "all" ||
    sort !== "featured";

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-sm">
          <label htmlFor="shop-search" className="sr-only">
            Search products
          </label>
          <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the archive…"
            className="w-full border-b border-white/20 bg-transparent py-3 pl-7 pr-8 text-sm text-bone placeholder:text-mist/70 focus:border-crimson focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-mist hover:text-bone"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            role="group"
            aria-label="Filter products"
            className="flex items-center gap-1 border border-white/15 p-1"
          >
            {filterOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                aria-pressed={filter === option.value}
                className={`px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${
                  filter === option.value
                    ? "bg-bone text-ink"
                    : "text-mist hover:text-bone"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <label htmlFor="shop-sort" className="sr-only">
            Sort products
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="border border-white/15 bg-ink-soft px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-bone focus:border-crimson focus:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="category-panel"
            className="flex items-center gap-2 border border-white/15 px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-mist transition-colors hover:text-bone lg:hidden"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Category
          </button>
        </div>
      </div>

      <div className="grid gap-10 pt-8 lg:grid-cols-[200px_1fr]">
        <aside
          id="category-panel"
          className={`${filtersOpen ? "block" : "hidden"} lg:block`}
        >
          <h2 className="text-[11px] font-bold uppercase tracking-[0.28em] text-bone">
            Category
          </h2>
          <ul className="mt-5 space-y-1">
            <li>
              <button
                type="button"
                onClick={() => setCategory("all")}
                className={`w-full text-left text-sm transition-colors ${
                  category === "all"
                    ? "text-crimson-soft"
                    : "text-mist hover:text-bone"
                }`}
              >
                All Products
              </button>
            </li>
            {CATEGORIES.map((item: Category) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`flex w-full items-center justify-between text-left text-sm transition-colors ${
                    category === item
                      ? "text-crimson-soft"
                      : "text-mist hover:text-bone"
                  }`}
                >
                  {item}
                  <span className="text-[10px] text-mist/70">
                    {products.filter((product) => product.category === item).length}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {hasFilters && (
            <button
              type="button"
              onClick={reset}
              className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-mist underline decoration-white/30 underline-offset-4 transition-colors hover:text-crimson"
            >
              Reset filters
            </button>
          )}
        </aside>

        <section aria-live="polite">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-mist">
            {loading
              ? "Loading products…"
              : `${results.length} ${results.length === 1 ? "product" : "products"}`}
          </p>

          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : results.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-5 border border-white/10 py-24 text-center">
              <p className="font-display text-3xl uppercase tracking-wide">
                No products found
              </p>
              <p className="max-w-sm text-sm text-mist">
                Nothing matched your search. Try a different keyword, or reset
                the filters to browse the full archive.
              </p>
              <button
                type="button"
                onClick={reset}
                className="bg-bone px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-crimson hover:text-white"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
              {results.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 4}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
