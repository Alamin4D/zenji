"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduceMotion
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 34 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative flex min-h-[600px] items-end overflow-hidden sm:min-h-[680px] lg:min-h-[86vh]">
      <Image
        src="/images/hero.jpg"
        alt="Two models wearing ZENJI oversized streetwear on a neon-lit Tokyo backstreet at night"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:px-10 lg:pb-28">
        <motion.p
          {...fadeUp(0.1)}
          className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.34em] text-crimson-soft sm:text-xs"
        >
          <span className="inline-block h-2 w-2 animate-pulse bg-crimson" />
          Drop 04 — Crimson Samurai — Live Now
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,10vw,7.5rem)] uppercase leading-[0.86] tracking-tight">
          <motion.span {...fadeUp(0.2)} className="block">
            Warrior
          </motion.span>
          <motion.span {...fadeUp(0.32)} className="block text-crimson">
            Streetwear
          </motion.span>
          <motion.span {...fadeUp(0.44)} className="block">
            From the Neon Age
          </motion.span>
        </h1>

        <motion.p
          {...fadeUp(0.56)}
          className="mt-7 max-w-lg text-sm leading-relaxed text-mist sm:text-base"
        >
          Heavyweight fabrics, hand-drawn anime artwork and limited runs that
          never come back. Made in small batches for the ones who move in
          silence.
        </motion.p>

        <motion.div
          {...fadeUp(0.68)}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 bg-crimson px-7 py-4 text-xs font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-crimson-soft"
          >
            Shop the Drop
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/lookbook"
            className="inline-flex items-center gap-3 border border-white/25 px-7 py-4 text-xs font-bold uppercase tracking-[0.24em] text-bone transition-colors hover:border-bone hover:bg-white/5"
          >
            View Lookbook
          </Link>
        </motion.div>

        <motion.dl
          {...fadeUp(0.82)}
          className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6 text-mist"
        >
          {[
            { label: "Pieces per drop", value: "250" },
            { label: "Restocks, ever", value: "Zero" },
            { label: "Based in", value: "Melbourne, AU" },
          ].map((stat) => (
            <div key={stat.label}>
              <dt className="text-[10px] uppercase tracking-[0.24em]">
                {stat.label}
              </dt>
              <dd className="mt-1 font-display text-2xl text-bone">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
