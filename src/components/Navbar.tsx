import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { NAV_ITEMS } from "../content";
import { Logo } from "./Logo";
import { EASE_OUT } from "./motion";
import { TelegramButton } from "./primitives";

/**
 * Floating glass pill navigation. Gains a frosted background after the
 * page scrolls; collapses into a sheet on small screens.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <m.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <div
        className={`mx-auto max-w-[1200px] rounded-[1.6rem] border transition-all duration-500 ${
          menuOpen
            ? "border-white/70 bg-[#FCFAF7]/95 shadow-[0_24px_60px_-20px_rgba(60,30,15,0.35)] backdrop-blur-xl"
            : solid
            ? "border-white/70 bg-white/70 shadow-[0_12px_40px_-16px_rgba(60,30,15,0.25)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex h-14 items-center justify-between pl-4 pr-2 sm:h-16 sm:pl-5">
          <a href="#top" aria-label="UniPrism home" className="text-brand-ink">
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-brand-ink/65 transition-colors hover:bg-brand-ink/[0.04] hover:text-brand-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <TelegramButton size="sm" />
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-full text-brand-ink transition-colors hover:bg-brand-ink/[0.05] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <m.nav
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="overflow-hidden lg:hidden"
            >
              <div className="flex flex-col gap-1 px-3 pb-4">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      // Collapsing the sheet cancels the browser's own anchor
                      // scroll on mobile Chrome, so scroll explicitly once the
                      // menu has started closing.
                      e.preventDefault();
                      setMenuOpen(false);
                      history.replaceState(null, "", item.href);
                      requestAnimationFrame(() =>
                        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" }),
                      );
                    }}
                    className="rounded-2xl px-3 py-3 font-sora text-lg font-medium tracking-[-0.02em] text-brand-ink hover:bg-brand-ink/[0.04]"
                  >
                    {item.label}
                  </a>
                ))}
                <TelegramButton size="md" className="mt-3 w-full" />
              </div>
            </m.nav>
          )}
        </AnimatePresence>
      </div>
    </m.header>
  );
}
