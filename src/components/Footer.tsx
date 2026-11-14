import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { LINKS, NAV_ITEMS } from "../content";
import { GithubIcon, InstagramIcon, TelegramIcon } from "./icons";
import { Logo } from "./Logo";
import { fadeUp, inView, stagger } from "./motion";
import { Container, TelegramButton } from "./primitives";

/** Closing call-to-action panel above the footer. */
export function FinalCta() {
  return (
    <section className="relative px-2 py-16 sm:px-4 sm:py-24">
      <m.div
        {...inView}
        variants={stagger(0.12)}
        className="relative isolate mx-auto max-w-[1360px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#D1663F] via-brand-terracotta to-[#8F3D23] px-5 py-20 text-center sm:rounded-[2.75rem] sm:py-28"
      >
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(232,163,61,0.65),transparent)]" />
          <div className="landing-grid-dark absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <PrismBeams />
        </div>

        <m.h2
          variants={fadeUp}
          className="mx-auto max-w-3xl text-balance font-sora text-[2.3rem] font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-6xl"
        >
          Your dream university is one tap away
        </m.h2>
        <m.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
          Join UniPrism in Telegram and start building a stronger application today. It&apos;s free to start.
        </m.p>
        <m.div variants={fadeUp} className="mt-10 flex justify-center">
          <TelegramButton variant="light" />
        </m.div>
      </m.div>
    </section>
  );
}

/** Large line drawing of the logo's prism splitting a beam of light. */
function PrismBeams() {
  return (
    <svg
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M-20 300 L215 235" stroke="rgba(255,255,255,0.28)" strokeWidth="2" />
      <path d="M300 60 L400 330 H200 Z" stroke="rgba(255,255,255,0.22)" strokeWidth="2" fill="rgba(255,255,255,0.04)" />
      <path d="M352 200 L640 90" stroke="rgba(232,163,61,0.55)" strokeWidth="3" />
      <path d="M352 200 L640 150" stroke="rgba(255,214,150,0.35)" strokeWidth="3" />
      <path d="M352 200 L640 215" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Telegram channel", href: LINKS.channel, icon: <TelegramIcon size={18} /> },
  { label: "Instagram", href: LINKS.instagram, icon: <InstagramIcon size={18} /> },
  { label: "GitHub", href: LINKS.github, icon: <GithubIcon size={18} /> },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden pb-10 pt-6">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 border-t border-brand-ink/[0.08] pt-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo className="text-brand-ink" />
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-brand-ink/55">
              The admissions companion for students applying to top universities worldwide, right inside Telegram.
            </p>
            <ul className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-brand-ink/[0.08] bg-white/60 text-brand-ink/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:bg-brand-terracotta hover:text-white hover:shadow-[0_10px_20px_-8px_rgba(198,93,59,0.8)]"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Product">
            {NAV_ITEMS.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Connect">
            <FooterLink href={LINKS.bot} external>
              Open the bot
            </FooterLink>
            <FooterLink href={LINKS.channel} external>
              Telegram channel
            </FooterLink>
            <FooterLink href={LINKS.support} external>
              Contact support
            </FooterLink>
            <FooterLink href={LINKS.github} external>
              Source code
            </FooterLink>
          </FooterColumn>
        </div>

        {/* Oversized wordmark */}
        <p
          aria-hidden="true"
          className="mt-16 select-none bg-gradient-to-b from-brand-ink/[0.09] to-transparent bg-clip-text text-center font-sora text-[22vw] font-bold leading-[0.8] tracking-[-0.07em] text-transparent lg:text-[15rem]"
        >
          UniPrism
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-brand-ink/[0.08] pt-8 text-xs text-brand-ink/45 sm:flex-row">
          <p>© {year} UniPrism. All rights reserved.</p>
          <p>Made for students applying abroad.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-ink/40">{title}</p>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group inline-flex items-center gap-1 text-sm text-brand-ink/70 transition-colors hover:text-brand-terracotta"
      >
        {children}
        {external && (
          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
        )}
      </a>
    </li>
  );
}
