import { m } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

import { FEATURES, type Feature } from "../content";
import { FeatureIcon } from "./icons";
import { EASE_OUT, fadeUp, inView, stagger } from "./motion";
import { Accent, Container, SectionHeader } from "./primitives";

/** Icon tile palettes, cycled across the cards. */
const TILES = [
  "from-[#D46A46] to-[#B4502F] text-white shadow-[0_10px_24px_-10px_rgba(198,93,59,0.9)]",
  "from-[#F0B556] to-[#DB8E2A] text-white shadow-[0_10px_24px_-10px_rgba(232,163,61,0.9)]",
  "from-[#2A2622] to-[#121110] text-brand-gold shadow-[0_10px_24px_-10px_rgba(0,0,0,0.6)]",
];

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="Features"
          title={
            <>
              Eight tools. One <Accent>application journey.</Accent>
            </>
          }
          description="Replace a dozen browser tabs, spreadsheets and expensive consultants with one app built for students applying abroad."
        />

        <m.ul
          {...inView}
          variants={stagger(0.07)}
          className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2 lg:gap-5 xl:grid-cols-4"
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              tile={TILES[i % TILES.length]}
              className={feature.size === "wide" ? "md:col-span-2" : ""}
            />
          ))}
        </m.ul>
      </Container>
    </section>
  );
}

function FeatureCard({ feature, tile, className }: { feature: Feature; tile: string; className: string }) {
  const wide = feature.size === "wide";

  // Feed the pointer position to the CSS spotlight (see .landing-spotlight).
  const onMove = (e: PointerEvent<HTMLLIElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <m.li
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onPointerMove={onMove}
      className={`landing-spotlight group relative overflow-hidden rounded-[1.75rem] border border-brand-ink/[0.07] bg-white/70 p-6 shadow-[0_1px_2px_rgba(26,26,26,0.04)] backdrop-blur-sm transition-[box-shadow,border-color] duration-500 hover:border-brand-terracotta/25 hover:shadow-[0_30px_60px_-24px_rgba(198,93,59,0.35)] sm:p-8 ${className}`}
    >
      <div className={wide ? "grid gap-8 sm:grid-cols-2 sm:items-end" : ""}>
        <div className="relative">
          <div className="flex items-start justify-between">
            <span
              className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ring-1 ring-inset ring-white/20 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${tile}`}
            >
              <FeatureIcon name={feature.icon} size={28} />
            </span>
            {feature.tag && (
              <span className="rounded-full border border-brand-ink/[0.08] bg-brand-cream px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-brand-ink/55">
                {feature.tag}
              </span>
            )}
          </div>
          <h3 className="mt-7 font-sora text-[1.3rem] font-semibold tracking-[-0.03em] text-brand-ink">
            {feature.title}
          </h3>
          <p className="mt-2.5 text-pretty text-[0.95rem] leading-relaxed text-brand-ink/60">{feature.description}</p>
        </div>

        {wide && <div className="w-full sm:max-w-[340px] sm:justify-self-end">{WIDGETS[feature.icon]}</div>}
      </div>
    </m.li>
  );
}

/* Small illustrative widgets for the wide cards. */

const RUBRIC = [
  { label: "Story", value: 92 },
  { label: "Voice", value: 84 },
  { label: "Clarity", value: 78 },
  { label: "Impact", value: 88 },
];

function EssayWidget() {
  return (
    <div aria-hidden="true" className="rounded-2xl border border-brand-ink/[0.06] bg-brand-cream/80 p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-brand-ink/45">Overall</span>
        <span className="font-sora text-2xl font-semibold tracking-tight text-brand-ink">
          8.7<span className="text-sm text-brand-ink/40"> / 10</span>
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {RUBRIC.map((r, i) => (
          <li key={r.label} className="grid grid-cols-[4.5rem_1fr] items-center gap-3 text-xs font-medium text-brand-ink/60">
            {r.label}
            <span className="h-1.5 overflow-hidden rounded-full bg-brand-ink/[0.07]">
              <m.span
                className="block h-full rounded-full bg-gradient-to-r from-brand-gold to-brand-terracotta"
                initial={{ width: 0 }}
                whileInView={{ width: `${r.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.12, ease: EASE_OUT }}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const PEOPLE = [
  { initials: "MA", tone: "from-[#D46A46] to-[#B4502F]" },
  { initials: "JK", tone: "from-[#F0B556] to-[#DB8E2A]" },
  { initials: "SN", tone: "from-[#5B4B40] to-[#2A2622]" },
  { initials: "AZ", tone: "from-[#E08C5C] to-[#C65D3B]" },
];

function StudyWidget() {
  return (
    <div aria-hidden="true" className="grid grid-cols-2 gap-2.5">
      {PEOPLE.map((p, i) => (
        <div
          key={p.initials}
          className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-xl bg-[#1E1B18]"
        >
          <span
            className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br font-sora text-sm font-semibold text-white ${p.tone}`}
          >
            {p.initials}
          </span>
          {i === 0 && <span className="absolute inset-0 rounded-xl ring-2 ring-inset ring-brand-gold/80" />}
          <span className="absolute bottom-1.5 left-2 flex items-center gap-1 text-[0.6rem] font-medium text-white/70">
            <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-emerald-400" : "bg-white/40"}`} />
            {i === 0 ? "Speaking" : "Focused"}
          </span>
        </div>
      ))}
    </div>
  );
}

function ChatWidget() {
  return (
    <div aria-hidden="true" className="space-y-2.5 text-[0.8rem] leading-snug">
      <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-brand-ink px-3.5 py-2.5 text-brand-cream">
        Do I need IELTS for TU Munich?
      </p>
      <div className="flex max-w-[92%] items-end gap-2">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#D46A46] to-[#B4502F] text-white">
          <FeatureIcon name="spark" size={15} />
        </span>
        <p className="rounded-2xl rounded-bl-md border border-brand-ink/[0.06] bg-brand-cream px-3.5 py-2.5 text-brand-ink/75">
          For English-taught programs, usually yes. Check each program page for the minimum band score.
        </p>
      </div>
      <div className="flex items-center gap-1 pl-9">
        {[0, 1, 2].map((i) => (
          <m.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-brand-ink/30"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}

function ReferralWidget() {
  return (
    <div aria-hidden="true" className="rounded-2xl border border-brand-ink/[0.06] bg-brand-cream/80 p-4">
      <div className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-brand-ink/15 bg-white px-3 py-2.5">
        <span className="truncate font-mono text-[0.75rem] text-brand-ink/60">t.me/UniPrismBot?start=ref…</span>
        <span className="shrink-0 rounded-lg bg-brand-ink px-2.5 py-1 text-[0.7rem] font-semibold text-brand-cream">Copy</span>
      </div>
      <ul className="mt-3 space-y-2">
        {[
          { initial: "D", name: "Friend joined" },
          { initial: "K", name: "Friend joined" },
        ].map((r, i) => (
          <li key={i} className="flex items-center justify-between text-[0.8rem]">
            <span className="flex items-center gap-2 text-brand-ink/70">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-ink/[0.06] text-[0.65rem] font-semibold text-brand-ink/60">
                {r.initial}
              </span>
              {r.name}
            </span>
            <span className="rounded-full bg-gradient-to-r from-brand-gold to-[#D9773F] whitespace-nowrap px-2 py-0.5 text-[0.7rem] font-semibold text-white">
              + coins
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const WIDGETS: Partial<Record<Feature["icon"], ReactNode>> = {
  essay: <EssayWidget />,
  study: <StudyWidget />,
  spark: <ChatWidget />,
  gift: <ReferralWidget />,
};
