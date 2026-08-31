"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import Logo from "@/components/Logo";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M4 4l7.2 9.3L4.4 20h2.3l5.6-6.1 4.5 6.1H20l-7.5-9.7L19.4 4h-2.3l-5.1 5.6L8.4 4H4z"
        fill="currentColor"
      />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 9.8l4.2 2.2L11 14.2V9.8z" fill="currentColor" />
    </svg>
  );
}

const shopLinks = [
  { href: "/shop", label: "All Products" },
  { href: "/shop?filter=new", label: "New Arrivals" },
  { href: "/shop?filter=sale", label: "Sale" },
  { href: "/shop?category=Accessories", label: "Accessories" },
];

const supportLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/faq#shipping", label: "Shipping" },
  { href: "/faq#returns", label: "Returns & Exchanges" },
  { href: "/faq#sizes", label: "Size Guide" },
];

const brandLinks = [
  { href: "/story", label: "Our Story" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/story#manifesto", label: "Manifesto" },
  { href: "/story#philosophy", label: "Philosophy" },
];

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
  { href: "https://x.com", label: "X", Icon: XIcon },
  { href: "https://youtube.com", label: "YouTube", Icon: YoutubeIcon },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-white/10 bg-ink-soft">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 border-b border-white/10 py-14 lg:grid-cols-[1.2fr_2fr] lg:gap-20">
          <div>
            <h2 className="font-display text-3xl uppercase leading-none tracking-wide sm:text-4xl">
              Join the
              <br />
              <span className="text-crimson">Inner Circle</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">
              Drop alerts, restock warnings and 24-hour early access. No spam —
              just the signal before the noise.
            </p>

            <form onSubmit={submit} className="mt-6 max-w-sm">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center border-b border-white/25 focus-within:border-crimson">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@email.com"
                  className="w-full bg-transparent py-3 text-sm text-bone placeholder:text-mist/70 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex shrink-0 items-center gap-2 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-bone transition-colors hover:text-crimson"
                >
                  Join
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {subscribed && (
                <p className="mt-3 flex items-center gap-2 text-xs text-crimson-soft">
                  <Check className="h-3.5 w-3.5" /> You&apos;re in. Watch your
                  inbox before the next drop.
                </p>
              )}
            </form>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <nav aria-label="Shop">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-bone">
                Shop
              </h3>
              <ul className="mt-5 space-y-3">
                {shopLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-mist transition-colors hover:text-crimson-soft"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Support">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-bone">
                Support
              </h3>
              <ul className="mt-5 space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-mist transition-colors hover:text-crimson-soft"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Brand">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-bone">
                Brand
              </h3>
              <ul className="mt-5 space-y-3">
                {brandLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-mist transition-colors hover:text-crimson-soft"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-8 py-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Logo />
            <p className="mt-4 text-xs leading-relaxed text-mist">
              ZENJI is an independent anime-inspired streetwear label based in
              Melbourne. Limited runs, heavyweight fabrics, and stories drawn
              frame by frame.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <div className="flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center border border-white/15 text-mist transition-colors hover:border-crimson hover:text-crimson"
                >
                  <Icon />
                </a>
              ))}
            </div>
            <p className="text-xs text-mist">
              © {new Date().getFullYear()} ZENJI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
