import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, RotateCcw, Ruler, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import Accordion from "@/components/Accordion";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchase from "@/components/ProductPurchase";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — ZENJI`,
      description: product.description,
      images: [{ url: product.images[0].src }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug, 4);

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-8 sm:px-6 lg:px-10">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-mist"
      >
        <Link href="/" className="hover:text-bone">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-bone">
          Shop
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-bone"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-bone">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery product={product} />

        <div className="lg:pt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-crimson">
            {product.category}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.95] tracking-tight">
            {product.name}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-mist">
            {product.description}
          </p>

          <div className="mt-8">
            <ProductPurchase product={product} />
          </div>

          <div className="mt-10 border-l-2 border-crimson pl-5">
            <p className="text-[10px] uppercase tracking-[0.28em] text-crimson">
              From the chapter
            </p>
            <p className="mt-2 font-display text-xl uppercase leading-snug tracking-wide">
              {product.story}
            </p>
          </div>
        </div>
      </div>

      {/* Product information */}
      <section className="mt-20 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div>
          <h2 className="font-display text-2xl uppercase tracking-wide sm:text-3xl">
            Product Information
          </h2>
          <div className="mt-6">
            <Accordion
              items={[
                {
                  title: "Details & Care",
                  content: (
                    <ul className="space-y-2">
                      {product.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <span className="mt-1.5 h-1 w-1 shrink-0 bg-crimson" />
                          {detail}
                        </li>
                      ))}
                      <li className="flex gap-3">
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-crimson" />
                        Cold machine wash inside out, line dry in shade. Do not
                        iron directly on the print.
                      </li>
                    </ul>
                  ),
                },
                {
                  title: "Size & Fit",
                  content: (
                    <div className="space-y-3">
                      <p>
                        {product.fit}. Available in XS to XXL. Between sizes?
                        Size up for an oversized silhouette.
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[320px] border-collapse text-left text-xs">
                          <thead>
                            <tr className="border-b border-white/10 text-mist">
                              <th className="py-2 pr-4 font-medium uppercase tracking-[0.16em]">
                                Size
                              </th>
                              <th className="py-2 pr-4 font-medium uppercase tracking-[0.16em]">
                                Chest (cm)
                              </th>
                              <th className="py-2 font-medium uppercase tracking-[0.16em]">
                                Length (cm)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { size: "XS", chest: "96", length: "66" },
                              { size: "S", chest: "102", length: "69" },
                              { size: "M", chest: "108", length: "72" },
                              { size: "L", chest: "114", length: "75" },
                              { size: "XL", chest: "120", length: "78" },
                              { size: "XXL", chest: "126", length: "81" },
                            ].map((row) => (
                              <tr
                                key={row.size}
                                className="border-b border-white/5"
                              >
                                <td className="py-2 pr-4 text-bone">
                                  {row.size}
                                </td>
                                <td className="py-2 pr-4">{row.chest}</td>
                                <td className="py-2">{row.length}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Shipping & Returns",
                  content: (
                    <div className="space-y-3">
                      <p>
                        Orders ship within 1–2 business days from Melbourne.
                        Free standard shipping across Australia on orders over
                        A$150.
                      </p>
                      <p>
                        Unworn items can be returned within 30 days for a full
                        refund or exchange. Sale pieces are eligible for store
                        credit.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
          {[
            {
              Icon: Truck,
              title: "Free AU shipping",
              body: "On every order over A$150. Express available at checkout.",
            },
            {
              Icon: RotateCcw,
              title: "30-day returns",
              body: "Unworn and unwashed items returned within 30 days.",
            },
            {
              Icon: Ruler,
              title: "True to size",
              body: "Every product is measured by hand and listed above.",
            },
          ].map(({ Icon, title, body }) => (
            <div
              key={title}
              className="border border-white/10 bg-ink-soft p-6"
            >
              <Icon className="h-5 w-5 text-crimson" />
              <h3 className="mt-4 font-display text-lg uppercase tracking-wide">
                {title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-mist">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="mt-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] uppercase leading-none tracking-tight">
            You may also like
          </h2>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-[0.24em] text-bone hover:text-crimson-soft"
          >
            View all
          </Link>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
          {related.map((item, index) => (
            <Reveal key={item.id} delay={0.05 * index}>
              <ProductCard product={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
