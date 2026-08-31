import type { Metadata } from "next";
import ShopClient from "@/components/ShopClient";
import type { FilterKey, SortKey } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the full ZENJI archive — heavyweight tees, hoodies, outerwear and accessories from limited anime-inspired drops.",
};

interface ShopPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

const filters: FilterKey[] = ["all", "new", "sale"];
const sorts: SortKey[] = ["featured", "price-asc", "price-desc", "newest"];

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const query = first(params.q) ?? "";
  const rawFilter = first(params.filter);
  const category = first(params.category) ?? "all";
  const rawSort = first(params.sort);

  const filter: FilterKey = filters.includes(rawFilter as FilterKey)
    ? (rawFilter as FilterKey)
    : "all";
  const sort: SortKey = sorts.includes(rawSort as SortKey)
    ? (rawSort as SortKey)
    : "featured";

  return (
    <>
      <section className="border-b border-white/10 bg-ink-soft">
        <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-crimson">
            Archive
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.25rem,7vw,5rem)] uppercase leading-[0.9] tracking-tight">
            Shop All
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-mist">
            Every piece currently in the ZENJI archive. Limited runs, no
            restocks — if your size is there, take it.
          </p>
        </div>
      </section>

      <ShopClient
        initialQuery={query}
        initialFilter={filter}
        initialCategory={category}
        initialSort={sort}
      />
    </>
  );
}
