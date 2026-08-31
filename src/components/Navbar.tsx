"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useCartTotals, useHydrated, useUiStore, useWishlistStore } from "@/lib/store";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/story", label: "Our Story" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCartTotals();
  const wishlistCount = useWishlistStore((state) => state.ids.length);
  const hydrated = useHydrated();
  const { menuOpen, setMenuOpen, setSearchOpen, openCart } = useUiStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-ink/90 backdrop-blur-xl"
            : "border-transparent bg-ink/40 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-10">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`relative py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-200 hover:text-crimson-soft ${
                      isActive(link.href) ? "text-bone" : "text-mist"
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="absolute -bottom-0.5 left-0 h-px w-full bg-crimson" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="grid h-10 w-10 place-items-center rounded-full text-mist transition-colors hover:bg-white/5 hover:text-bone"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <Link
              href="/wishlist"
              aria-label={`Wishlist${hydrated && wishlistCount ? `, ${wishlistCount} item(s)` : ""}`}
              className="relative grid h-10 w-10 place-items-center rounded-full text-mist transition-colors hover:bg-white/5 hover:text-bone"
            >
              <Heart className="h-[18px] w-[18px]" />
              {hydrated && wishlistCount > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-crimson px-1 text-[9px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart${hydrated && count ? `, ${count} item(s)` : ""}`}
              className="relative grid h-10 w-10 place-items-center rounded-full text-mist transition-colors hover:bg-white/5 hover:text-bone"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {hydrated && count > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-crimson px-1 text-[9px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid h-10 w-10 place-items-center rounded-full text-mist transition-colors hover:bg-white/5 hover:text-bone lg:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              aria-label="Mobile"
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-white/10 bg-ink-soft"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full text-mist hover:bg-white/5 hover:text-bone"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="flex flex-col gap-1 px-6 py-6">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * index + 0.1, duration: 0.35 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between border-b border-white/5 py-4 font-display text-3xl uppercase tracking-wide transition-colors ${
                        isActive(link.href)
                          ? "text-crimson"
                          : "text-bone hover:text-crimson-soft"
                      }`}
                    >
                      {link.label}
                      <span className="text-xs text-mist">0{index + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto space-y-3 px-6 pb-10">
                <Link
                  href="/shop"
                  className="flex w-full items-center justify-center bg-crimson px-6 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition-colors hover:bg-crimson-soft"
                >
                  Shop the Drop
                </Link>
                <p className="text-center text-[11px] uppercase tracking-[0.28em] text-mist">
                  Melbourne · Worldwide
                </p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
