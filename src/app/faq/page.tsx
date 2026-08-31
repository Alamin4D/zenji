import type { Metadata } from "next";
import Link from "next/link";
import Accordion, { type AccordionItem } from "@/components/Accordion";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers on ZENJI orders, shipping, products, sizing, returns and how our limited drops work.",
};

const faqGroups: { id: string; title: string; items: AccordionItem[] }[] = [
  {
    id: "orders",
    title: "Orders",
    items: [
      {
        title: "How do I know my order went through?",
        content:
          "You'll get a confirmation email within a few minutes of checkout with your order reference (starting ZJ-). If it hasn't arrived in 30 minutes, check your spam folder or contact support@zenji.store.",
      },
      {
        title: "Can I change or cancel my order?",
        content:
          "Orders are packed fast, but if you email us within 2 hours of placing it we can usually edit sizes or cancel before dispatch.",
      },
      {
        title: "Do you offer gift cards?",
        content:
          "Not yet. Gift cards are on the roadmap for Drop 05 — join the Inner Circle newsletter to hear when they land.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping",
    items: [
      {
        title: "Where do you ship from?",
        content:
          "Everything ships from our studio in Melbourne, Australia. Orders are packed and dispatched within 1–2 business days.",
      },
      {
        title: "How much is shipping?",
        content:
          "Standard shipping is A$9.95 across Australia and free on orders over A$150. International flat rate is A$24.95 with tracking, or free over A$250.",
      },
      {
        title: "How long does delivery take?",
        content:
          "Australia: 2–5 business days. New Zealand: 4–8 business days. Rest of world: 7–14 business days. Express options are available at checkout.",
      },
    ],
  },
  {
    id: "products",
    title: "Products",
    items: [
      {
        title: "How should I wash my ZENJI pieces?",
        content:
          "Cold machine wash inside out with like colours, and line dry in the shade. Never iron directly on a print — turn the garment inside out and use low heat.",
      },
      {
        title: "Are the prints durable?",
        content:
          "Yes. We use high-density water-based inks cured at commercial temperatures. Expect the print to soften with wear rather than crack or peel.",
      },
      {
        title: "Where are the garments made?",
        content:
          "Cut, sewn and printed in small workshops in Australia and Japan that we visit in person. We don't use anonymous mass-production factories.",
      },
    ],
  },
  {
    id: "sizes",
    title: "Sizes",
    items: [
      {
        title: "What sizes do you stock?",
        content:
          "Most garments run XS through XXL. Caps and beanies are one size with an adjustable strap or stretch knit.",
      },
      {
        title: "How do I pick the right size?",
        content:
          "Every product page includes a size table and a fit note. Tees and hoodies are cut oversized — size down if you want a cleaner line, stay true to size for the intended silhouette.",
      },
      {
        title: "Do you offer petite or tall cuts?",
        content:
          "Not currently. Our oversized blocks are designed to drape across a wide range of heights; the length measurements on each product page will help you decide.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns",
    items: [
      {
        title: "What is your return window?",
        content:
          "30 days from delivery for a full refund or exchange on unworn, unwashed items with tags attached. Sale pieces are eligible for store credit.",
      },
      {
        title: "How do I start a return?",
        content:
          "Email support@zenji.store with your order reference and the items you'd like to return. We'll reply with a prepaid label if you're in Australia.",
      },
      {
        title: "Do you exchange sizes?",
        content:
          "Yes — subject to stock. Because drops are limited, we recommend ordering quickly; if your size is gone we'll issue store credit.",
      },
    ],
  },
  {
    id: "drops",
    title: "Drops",
    items: [
      {
        title: "How do drops work?",
        content:
          "We release one collection at a time in runs of roughly 250 pieces. When a drop sells out it is archived permanently — there are no restocks.",
      },
      {
        title: "How do I get early access?",
        content:
          "Join the Inner Circle newsletter. Members receive a private link 24 hours before every public drop, plus restock and restage alerts.",
      },
      {
        title: "How often do you release?",
        content:
          "Roughly every 8–10 weeks. We'd rather release four considered drops a year than twelve fillers.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-ink-soft">
        <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-crimson">
            Support
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.25rem,7vw,5rem)] uppercase leading-[0.9] tracking-tight">
            FAQ
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-mist">
            Everything about orders, shipping, sizing, returns and how ZENJI
            drops work.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          <nav aria-label="FAQ categories" className="lg:sticky lg:top-28 lg:h-fit">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.28em] text-bone">
              Categories
            </h2>
            <ul className="mt-5 space-y-2">
              {faqGroups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="text-sm text-mist transition-colors hover:text-crimson-soft"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-14">
            {faqGroups.map((group) => (
              <section key={group.id} id={group.id} className="scroll-mt-28">
                <Reveal>
                  <h2 className="font-display text-2xl uppercase tracking-wide sm:text-3xl">
                    {group.title}
                  </h2>
                </Reveal>
                <div className="mt-4">
                  <Accordion items={group.items} defaultOpen={-1} />
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="mt-20 border border-white/10 bg-ink-soft p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl uppercase tracking-wide sm:text-3xl">
            Still need help?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-mist">
            Our team replies within one business day — usually much sooner
            during drop week.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:support@zenji.store"
              className="bg-crimson px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-crimson-soft"
            >
              Email support
            </a>
            <Link
              href="/shop"
              className="border border-white/25 px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] transition-colors hover:border-bone"
            >
              Back to shop
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
