import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "ZENJI is an anime-inspired streetwear label from Melbourne. Samurai discipline, animation storytelling, and limited production runs.",
};

const chapters = [
  {
    number: "Chapter 01",
    title: "The Spark",
    body: "ZENJI started in 2019 with a second-hand drawing tablet, a bedroom printer and a stack of blank tees. The idea was simple: the animation we grew up on carried more discipline, grief and honour than most of the clothes on the rack. We wanted that weight on fabric.",
    image: "/images/products/blue-flame-tee.jpg",
    alt: "ZENJI Blue Flame Tee laid flat against a dark backdrop",
  },
  {
    number: "Chapter 02",
    title: "The Warrior Code",
    body: "The samurai didn't dress for attention — they dressed for intent. Every layer had a purpose, every symbol meant something. That's why our cuts are considered and our prints are deliberate. If a graphic doesn't carry a story, it doesn't leave the studio.",
    image: "/images/products/crimson-samurai-hoodie.jpg",
    alt: "Crimson Samurai Hoodie with full back illustration",
  },
  {
    number: "Chapter 03",
    title: "The Anime Influence",
    body: "The genre taught us that a single frame can hold an entire emotion. Our drops are storyboarded like episodes: an opening piece, a mid-season escalation, and a final piece that closes the arc. Buy the garment and you're buying a page of the script.",
    image: "/images/products/oni-mask-tee.jpg",
    alt: "Oni Mask Tee with hand-inked demon mask print",
  },
  {
    number: "Chapter 04",
    title: "The Street Culture",
    body: "Streetwear has always been about belonging to something without asking permission. We keep runs small so that the people who wear ZENJI know they're part of a limited chapter — not a restock cycle.",
    image: "/images/lookbook/look-1760699.jpg",
    alt: "ZENJI editorial portrait on a vibrant city street at night",
  },
];

const principles = [
  {
    title: "Draw before you cut",
    body: "Artwork is hand-inked and storyboarded first. The garment is engineered around the illustration, never the other way around.",
  },
  {
    title: "Fabric is a promise",
    body: "220–420gsm cotton, ripstop and technical nylon. If it can't survive three winters, it isn't ZENJI.",
  },
  {
    title: "Scarcity with substance",
    body: "250 pieces per drop, zero restocks. Limited isn't a tactic for us — it's how small studios work honestly.",
  },
  {
    title: "Made by people we know",
    body: "Cut, sewn and printed in small Australian and Japanese workshops we visit in person.",
  },
];

export default function StoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[460px] items-end overflow-hidden lg:min-h-[70vh]">
        <Image
          src="/images/hero.jpg"
          alt="ZENJI models in oversized streetwear on a neon Tokyo street at night"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-crimson-soft">
            Our Story
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-[0.88] tracking-tight">
            ZENJI — The accomplished one
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
            禅 — the name means mastery earned through repetition. Every drop is
            another repetition: draw, cut, release, repeat.
          </p>
        </div>
      </section>

      {/* Intro statement */}
      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <Reveal>
          <p className="max-w-4xl font-display text-[clamp(1.6rem,4.5vw,3.25rem)] uppercase leading-[1.05] tracking-tight">
            We are an anime-inspired streetwear label from Melbourne building
            limited-run garments around hand-drawn stories — samurai discipline,
            neon nostalgia and the quiet confidence of people who don&apos;t
            need to explain themselves.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
          {[
            { value: "2019", label: "Founded in Melbourne" },
            { value: "04", label: "Drops released" },
            { value: "250", label: "Pieces per drop" },
          ].map((stat, index) => (
            <Reveal key={stat.label} delay={0.08 * index}>
              <p className="font-display text-4xl text-crimson sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-mist">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Chapters */}
      <section className="border-y border-white/10 bg-ink-soft">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.number}
            className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10 lg:py-20"
          >
            <Reveal
              className={index % 2 === 1 ? "lg:order-2" : ""}
              delay={0.05}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={chapter.image}
                  alt={chapter.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] hover:scale-105"
                />
              </div>
            </Reveal>
            <Reveal delay={0.15} className={index % 2 === 1 ? "lg:order-1" : ""}>
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-crimson">
                {chapter.number}
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,3.25rem)] uppercase leading-[0.98] tracking-tight">
                {chapter.title}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
                {chapter.body}
              </p>
            </Reveal>
          </div>
        ))}
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="mx-auto max-w-[1440px] scroll-mt-24 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-crimson">
            Philosophy
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.98] tracking-tight">
            Clothing as a discipline, not a costume
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} delay={0.08 * index}>
              <div className="border-t border-white/15 pt-6">
                <h3 className="font-display text-2xl uppercase tracking-wide">
                  {principle.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-mist">
                  {principle.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section
        id="manifesto"
        className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-crimson py-20 lg:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-white/80">
              The ZENJI Manifesto
            </p>
            <ul className="mt-8 max-w-4xl space-y-6">
              {[
                "We release less so that what we release matters.",
                "We draw every line by hand before a single garment is cut.",
                "We make clothes heavy enough to be inherited.",
                "We tell stories that outlive the season.",
                "We answer to the people wearing the pieces, not to a trend cycle.",
              ].map((line, index) => (
                <Reveal key={line} delay={0.06 * index}>
                  <li className="flex items-start gap-5">
                    <span className="mt-2 font-display text-2xl text-white/70">
                      0{index + 1}
                    </span>
                    <span className="font-display text-[clamp(1.35rem,3.5vw,2.5rem)] uppercase leading-tight tracking-wide text-white">
                      {line}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1440px] px-4 py-20 text-center sm:px-6 lg:px-10">
        <Reveal>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-none tracking-tight">
            Wear the next chapter
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-mist">
            Drop 04 — Crimson Samurai is live. 250 pieces. No restocks.
          </p>
          <Link
            href="/shop"
            className="group mt-8 inline-flex items-center gap-3 bg-crimson px-8 py-4 text-xs font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-crimson-soft"
          >
            Shop the drop
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
