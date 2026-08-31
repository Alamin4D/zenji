import Link from "next/link";

interface LogoProps {
  className?: string;
  href?: string;
}

export default function Logo({ className = "", href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="ZENJI — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="relative grid h-8 w-8 place-items-center overflow-hidden border border-white/20 bg-crimson transition-colors duration-300 group-hover:bg-crimson-soft">
        <span className="font-display text-[15px] leading-none tracking-tight text-white">
          禅
        </span>
      </span>
      <span className="font-display text-[26px] leading-none tracking-[0.18em] text-bone transition-colors duration-300 group-hover:text-crimson-soft">
        ZENJI
      </span>
    </Link>
  );
}
