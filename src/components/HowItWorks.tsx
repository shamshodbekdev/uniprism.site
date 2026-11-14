import { m } from "framer-motion";
import { MousePointerClick, Route, Trophy, type LucideIcon } from "lucide-react";

import { STEPS } from "../content";
import { EASE_OUT, fadeUp, inView, stagger } from "./motion";
import { Accent, Container, SectionHeader, TelegramButton } from "./primitives";

const STEP_ICONS: LucideIcon[] = [MousePointerClick, Route, Trophy];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="How it works"
          title={
            <>
              From first tap to <Accent>acceptance letter</Accent>
            </>
          }
          description="No downloads and no sign-up forms. If you have Telegram, you are already set up."
        />

        <m.ol {...inView} variants={stagger(0.25)} className="relative mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {/* Desktop connector: draws itself left to right */}
          <Connector className="absolute left-[16.66%] right-[16.66%] top-[2.75rem] hidden lg:block" orientation="horizontal" />
          {/* Mobile connector: vertical, behind the badges */}
          <Connector className="absolute bottom-16 left-[2.75rem] top-16 lg:hidden" orientation="vertical" />

          {STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <m.li key={step.title} variants={fadeUp} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
                <div className="relative z-10 shrink-0">
                  <span className="grid h-[5.5rem] w-[5.5rem] place-items-center rounded-[1.6rem] border border-white bg-white/80 shadow-[0_20px_40px_-20px_rgba(198,93,59,0.5)] backdrop-blur">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#D46A46] to-[#B4502F] text-white shadow-[0_10px_20px_-8px_rgba(198,93,59,0.9)]">
                      <Icon className="h-6 w-6" strokeWidth={1.9} />
                    </span>
                  </span>
                  <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-brand-ink font-sora text-xs font-semibold text-brand-cream ring-4 ring-brand-cream">
                    {i + 1}
                  </span>
                </div>
                <div className="pt-2 lg:pt-6">
                  <h3 className="font-sora text-xl font-semibold tracking-[-0.03em] text-brand-ink">{step.title}</h3>
                  <p className="mt-2 max-w-sm text-pretty leading-relaxed text-brand-ink/60">{step.description}</p>
                </div>
              </m.li>
            );
          })}
        </m.ol>

        <m.div {...inView} variants={fadeUp} className="mt-14 flex justify-center">
          <TelegramButton label="Start the bot" size="md" />
        </m.div>
      </Container>
    </section>
  );
}

function Connector({ className, orientation }: { className: string; orientation: "horizontal" | "vertical" }) {
  const horizontal = orientation === "horizontal";
  const d = horizontal ? "M0 1 H100" : "M1 0 V100";
  return (
    <div aria-hidden="true" className={className}>
      {/* Dashed track (CSS border: SVG dashes would stretch with the viewBox) */}
      <span
        className={`absolute border-dashed border-brand-ink/15 ${
          horizontal ? "inset-x-0 top-0 border-t-2" : "inset-y-0 left-0 border-l-2"
        }`}
      />
      <svg
        className={`relative ${horizontal ? "block h-[2px] w-full" : "block h-full w-[2px]"}`}
        viewBox={horizontal ? "0 0 100 2" : "0 0 2 100"}
        preserveAspectRatio="none"
      >
        <m.path
          d={d}
          stroke={`url(#connector-${orientation})`}
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.8, ease: EASE_OUT, delay: 0.3 }}
        />
        <defs>
          {/* userSpaceOnUse: a straight line has a zero-height bounding box,
              which would make an objectBoundingBox gradient invisible. */}
          <linearGradient
            id={`connector-${orientation}`}
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2={horizontal ? "100" : "0"}
            y2={horizontal ? "0" : "100"}
          >
            <stop offset="0" stopColor="#E8A33D" />
            <stop offset="1" stopColor="#C65D3B" />
          </linearGradient>
        </defs>
      </svg>
      {/* A spark that keeps travelling along the line */}
      <span
        className={`absolute h-2 w-2 rounded-full bg-brand-gold shadow-[0_0_12px_4px_rgba(232,163,61,0.6)] ${
          horizontal ? "landing-travel-x -top-[3px] left-0" : "landing-travel-y -left-[3px] top-0"
        }`}
      />
    </div>
  );
}
