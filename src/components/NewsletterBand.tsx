"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("done");
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[420px] w-[820px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-crimson">
          Newsletter
        </p>
        <h2 className="mt-5 font-display text-[clamp(1.9rem,5vw,3.25rem)] uppercase leading-[0.98] tracking-tight">
          Get the drop before it drops
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-mist">
          24-hour early access, restock alerts and behind-the-scenes artwork.
          One email per drop — nothing else.
        </p>

        <form
          onSubmit={submit}
          className="mx-auto mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="home-newsletter" className="sr-only">
            Email address
          </label>
          <input
            id="home-newsletter"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@email.com"
            className="flex-1 border border-white/20 bg-ink-soft px-4 py-3.5 text-sm text-bone placeholder:text-mist/70 focus:border-crimson focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-crimson px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-crimson-soft"
          >
            Subscribe
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p
          className={`mt-4 text-xs transition-opacity duration-300 ${
            status === "done" ? "text-crimson-soft opacity-100" : "opacity-0"
          }`}
          role="status"
        >
          <Check className="mr-1.5 inline h-3.5 w-3.5" />
          Subscribed. Your early-access link lands before every drop.
        </p>
      </div>
    </section>
  );
}
