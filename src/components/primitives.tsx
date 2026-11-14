/**
 * Building blocks shared by the landing sections: page container, section
 * header and the call-to-action buttons.
 */

import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { LINKS } from "../content";
import { TelegramIcon } from "./icons";
import { fadeUp, inView, stagger } from "./motion";

/** Max-width page container with a 16px mobile gutter. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/** Small pill label above section titles. */
export function Eyebrow({ children, inverted = false }: { children: ReactNode; inverted?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-[0.8rem] font-medium tracking-wide ${
        inverted
          ? "border-white/10 bg-white/5 text-brand-cream/80"
          : "border-brand-ink/[0.08] bg-white/60 text-brand-ink/70 backdrop-blur"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-brand-gold to-brand-terracotta" />
      {children}
    </span>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  inverted?: boolean;
  align?: "center" | "left";
}

export function SectionHeader({ eyebrow, title, description, inverted, align = "center" }: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <m.div {...inView} variants={stagger(0.1)} className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <m.div variants={fadeUp}>
        <Eyebrow inverted={inverted}>{eyebrow}</Eyebrow>
      </m.div>
      <m.h2
        variants={fadeUp}
        className={`mt-5 text-balance font-sora text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.4rem] ${
          inverted ? "text-brand-cream" : "text-brand-ink"
        }`}
      >
        {title}
      </m.h2>
      {description && (
        <m.p
          variants={fadeUp}
          className={`mt-5 text-pretty text-base leading-relaxed sm:text-lg ${
            centered ? "mx-auto max-w-2xl" : ""
          } ${inverted ? "text-brand-cream/60" : "text-brand-ink/60"}`}
        >
          {description}
        </m.p>
      )}
    </m.div>
  );
}

/** Gradient text used for the accent words in headlines. */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-brand-terracotta via-[#D9773F] to-brand-gold bg-clip-text text-transparent">
      {children}
    </span>
  );
}

interface TelegramButtonProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  /** Soft expanding ring behind the button. */
  pulse?: boolean;
  variant?: "primary" | "light";
  className?: string;
}

/** Primary call-to-action: opens the bot in Telegram. */
export function TelegramButton({
  label = "Open in Telegram",
  size = "lg",
  pulse = false,
  variant = "primary",
  className = "",
}: TelegramButtonProps) {
  const sizing = {
    sm: "h-10 gap-2 pl-3.5 pr-4 text-sm",
    md: "h-12 gap-2.5 pl-4 pr-5 text-[0.95rem]",
    lg: "h-14 gap-3 pl-5 pr-6 text-base sm:h-[3.75rem] sm:pl-6 sm:pr-7",
  }[size];
  const colors =
    variant === "primary"
      ? "bg-gradient-to-b from-[#D46A46] to-brand-terracotta text-white shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_12px_32px_-10px_rgba(198,93,59,0.75)]"
      : "bg-brand-cream text-brand-ink shadow-[0_12px_32px_-12px_rgba(0,0,0,0.5)]";

  return (
    <span className={`relative inline-flex ${className}`}>
      {pulse && (
        <>
          <span aria-hidden="true" className="landing-pulse absolute inset-0 rounded-full" />
          <span aria-hidden="true" className="landing-pulse landing-pulse-delay absolute inset-0 rounded-full" />
        </>
      )}
      <m.a
        href={LINKS.bot}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2, scale: 1.015 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className={`group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full font-semibold tracking-[-0.01em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-terracotta ${sizing} ${colors}`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 blur-sm transition-transform duration-1000 ease-out group-hover:translate-x-[450%]"
        />
        <span
          className={`grid place-items-center rounded-full ${
            variant === "primary" ? "bg-white/15" : "bg-brand-terracotta text-white"
          } ${size === "lg" ? "h-8 w-8" : "h-7 w-7"}`}
        >
          <TelegramIcon size={size === "lg" ? 17 : 15} className="-translate-x-[1px]" />
        </span>
        <span>{label}</span>
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2.2}
        />
      </m.a>
    </span>
  );
}

/** Secondary text link with an arrow. */
export function GhostLink({ href, children, inverted = false }: { href: string; children: ReactNode; inverted?: boolean }) {
  return (
    <a
      href={href}
      className={`group inline-flex h-14 items-center gap-2 rounded-full px-5 font-semibold tracking-[-0.01em] transition-colors ${
        inverted ? "text-brand-cream/80 hover:text-white" : "text-brand-ink/75 hover:text-brand-ink"
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2} />
    </a>
  );
}
