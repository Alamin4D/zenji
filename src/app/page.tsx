import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package, ShieldCheck, Sparkles } from "lucide-react";
import DropCountdown from "@/components/DropCountdown";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getFeaturedProducts, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import NewsletterBand from "@/components/NewsletterBand";

const ticker = [
  "禅",
  "Limited Drops",
  "Anime Culture",
  "Samurai Code",
  "Heavyweight Cotton",
  "Melbourne",
  "No Restocks",
];

const manifesto = [
  {
    number: "01",
    title: "Draw First",
    body: "Every graphic starts as a hand-inked frame. No templates, no stock art — illustration comes before the garment, never after.",
  },
  {
    number: "02",
    title: "Make It Heavy",
    body: "220gsm tees, 420gsm fleece, ripstop that survives a mosh pit. Streetwear should outlast the trend it was born in.",
  },
  {
    number: "03",
    title: "Release Less",
    body: "250 pieces per drop. When it's gone it stays gone, because scarcity without substance is just marketing.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts(3);
  const [lead, ...rest] = featured;
  const latest = products
    .slice()
    .sort(
      (a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
    )
    .slice(0, 4);

  return (
    <>
      <Hero />

      {/* Ticker */}
      <div className="overflow-hidden border-y border-white/10 bg-crimson py-3">
        <div className="flex w-max animate-marquee">
          {[...ticker, ...ticker].map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="flex items-center gap-6 px-6 font-display text-lg uppercase tracking-[0.2em] text-white"
            >
              {word}
              <span aria-hidden="true" className="text-white/60">
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Brand introduction */}
      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-crimson">
              The Brand
            </p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] uppercase leading-[0.95] tracking-tight">
              ZENJI is what happens when anime meets the armour of a samurai
            </h2>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col justify-center">
            <p className="text-base leading-relaxed text-mist">
              We started in a small Melbourne studio with one screen, one
              drawing tablet and a stubborn idea: that streetwear could carry
              the same weight of story as the animation that raised us.
            </p>
            <p className="mt-5 text-base leading-relaxed text-mist">
              Each drop is a chapter. Hand-drawn artwork, heavyweight fabrics
              and small production runs — cut, printed and finished by people we
              know by name.
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                { Icon: Sparkles, label: "Hand-drawn artwork" },
                { Icon: Package, label: "Limited runs of 250" },
                { Icon: ShieldCheck, label: "Quality guarantee" },
              ].map(({ Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-crimson" />
                  <span className="text-xs uppercase tracking-[0.14em] text-mist">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/story"
              className="group mt-10 inline-flex w-fit items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-bone"
            >
              Read our story
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Featured collection */}
      <section className="border-y border-white/10 bg-ink-soft py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-crimson">
                Featured Collection
              </p>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-none tracking-tight">
                Drop 04 — Crimson Samurai
              </h2>
            </div>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-bone"
            >
              Shop all
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal className="group relative">
              <Link
                href={`/product/${lead.slug}`}
                className="relative block aspect-[4/5] overflow-hidden bg-ink sm:aspect-[3/4]"
              >
                <Image
                  src={lead.images[0].src}
                  alt={lead.images[0].alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-crimson-soft">
                    {lead.category} · {lead.colorway}
                  </p>
                  <h3 className="mt-3 font-display text-3xl uppercase tracking-wide sm:text-5xl">
                    {lead.name}
                  </h3>
                  <p className="mt-3 max-w-md text-sm text-mist">
                    {lead.story}
                  </p>
                  <p className="mt-4 text-sm font-semibold">
                    {formatPrice(lead.price)}
                  </p>
                </div>
              </Link>
            </Reveal>

            <div className="grid gap-6">
              {rest.map((product, index) => (
                <Reveal key={product.id} delay={0.1 * (index + 1)}>
                  <Link
                    href={`/product/${product.slug}`}
                    className="group relative flex h-full gap-5 overflow-hidden bg-ink p-4 sm:gap-8 sm:p-6"
                  >
                    <span className="relative aspect-[4/5] w-32 shrink-0 overflow-hidden sm:w-44">
                      <Image
                        src={product.images[0].src}
                        alt={product.images[0].alt}
                        fill
                        sizes="176px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </span>
                    <span className="flex flex-col justify-center">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-mist">
                        {product.category}
                      </span>
                      <span className="mt-2 font-display text-2xl uppercase tracking-wide sm:text-3xl">
                        {product.name}
                      </span>
                      <span className="mt-2 line-clamp-2 max-w-sm text-xs leading-relaxed text-mist">
                        {product.description}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">
                        {formatPrice(product.salePrice ?? product.price)}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Countdown band */}
      <section className="relative overflow-hidden py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid items-center gap-10 border border-white/10 bg-ink-soft p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-crimson">
                Next Drop
              </p>
              <h2 className="mt-5 font-display text-[clamp(1.75rem,4vw,3rem)] uppercase leading-tight tracking-tight">
                Drop 05 — Neon Ronin
              </h2>
              <p className="mt-4 max-w-md text-sm text-mist">
                Members of the Inner Circle get access 24 hours before the
                public release. Once the timer hits zero, the archive opens.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="lg:justify-self-end">
              <DropCountdown />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Latest products */}
      <section className="mx-auto max-w-[1440px] px-4 pb-24 sm:px-6 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-crimson">
              Latest
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-none tracking-tight">
              Fresh from the frame
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-bone"
          >
            View all products
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 xl:grid-cols-4">
          {latest.map((product, index) => (
            <Reveal key={product.id} delay={0.06 * index}>
              <ProductCard product={product} priority={index < 2} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="border-y border-white/10 bg-ink-soft py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-crimson">
              Philosophy
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.98] tracking-tight">
              Make less. Mean more. Move in silence.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {manifesto.map((item, index) => (
              <Reveal key={item.number} delay={0.1 * index}>
                <div className="border-t border-white/15 pt-6">
                  <span className="font-display text-5xl text-crimson/70">
                    {item.number}
                  </span>
                  <h3 className="mt-4 font-display text-2xl uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <NewsletterBand />
    </>
  );
}
