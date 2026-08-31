import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import LookbookGallery from "@/components/LookBookGallery";

export const metadata: Metadata = {
  title: "Lookbook",
  description:
    "The ZENJI lookbook — editorial imagery from Drop 03 and Drop 04, shot between Melbourne and Tokyo.",
};

export default function LookbookPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-ink-soft">
        <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10 lg:py-24">
          <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-crimson">
            Lookbook
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-[0.88] tracking-tight">
            Frames from the drop
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
            Every campaign is shot like a storyboard — one location, one mood,
            one chapter of the ZENJI archive. Hover any frame to read the
            caption, tap to open it full screen.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10">
        <Reveal>
          <LookbookGallery />
        </Reveal>
      </section>

      <section className="border-t border-white/10 bg-ink-soft py-20">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-10">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] uppercase leading-tight tracking-tight">
            Seen something you want?
          </h2>
          <p className="max-w-md text-sm text-mist">
            Most lookbook pieces are still live in the archive — but runs are
            250 pieces and never come back.
          </p>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 bg-crimson px-8 py-4 text-xs font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-crimson-soft"
          >
            Shop the archive
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
