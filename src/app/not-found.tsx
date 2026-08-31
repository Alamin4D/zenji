import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[1440px] flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <p className="font-display text-[clamp(4rem,16vw,10rem)] leading-none text-crimson">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl uppercase tracking-wide sm:text-4xl">
        This frame is missing
      </h1>
      <p className="mt-3 max-w-md text-sm text-mist">
        The page you were looking for has been archived — or never made it out
        of the studio.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/shop"
          className="bg-bone px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-ink transition-colors hover:bg-crimson hover:text-white"
        >
          Shop the drop
        </Link>
        <Link
          href="/"
          className="border border-white/25 px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] transition-colors hover:border-bone"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
