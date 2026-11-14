import { m, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { STATS, type Stat } from "../content";
import { fadeUp, inView, stagger } from "./motion";
import { Container, SectionHeader } from "./primitives";

export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="relative px-2 sm:px-4">
      <div className="relative isolate mx-auto max-w-[1360px] overflow-hidden rounded-[2rem] bg-brand-ink py-20 sm:rounded-[2.75rem] sm:py-28">
        {/* Glow + grid */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(198,93,59,0.45),transparent)]" />
          <div className="absolute -bottom-48 -right-32 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(232,163,61,0.3),transparent)]" />
          <div className="landing-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        </div>

        <Container>
          <div id="stats-title">
            <SectionHeader
              inverted
              eyebrow="By the numbers"
              title="Built on real admissions data"
              description="Every university, essay and question in UniPrism is curated, so you plan with facts instead of rumors."
            />
          </div>

          <m.dl
            {...inView}
            variants={stagger(0.1)}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:mt-16 lg:grid-cols-4"
          >
            {STATS.map((stat) => (
              <m.div key={stat.label} variants={fadeUp} className="flex flex-col-reverse bg-[#1F1D1B]/90 px-4 py-8 text-center backdrop-blur sm:px-6 sm:py-12">
                <dt className="mt-3 text-[0.8rem] text-brand-cream/55 sm:text-sm">{stat.label}</dt>
                <dd className="font-sora text-[2.5rem] font-semibold leading-none tracking-[-0.05em] text-brand-cream sm:text-6xl">
                  <CountUp stat={stat} />
                </dd>
              </m.div>
            ))}
          </m.dl>
        </Container>
      </div>
    </section>
  );
}

const DURATION_MS = 1800;

/** Counts from 0 to the target once the number scrolls into view. */
function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (reduce) {
      setValue(stat.value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      const eased = 1 - Math.pow(2, -10 * t); // easeOutExpo
      setValue(t === 1 ? stat.value : Math.round(stat.value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, reduce, stat.value]);

  return (
    <span ref={ref} className="tabular-nums">
      {/* Screen readers get the final number, not every frame. */}
      <span className="sr-only">
        {stat.value.toLocaleString("en-US")}
        {stat.suffix}
      </span>
      <span aria-hidden="true">
        {value.toLocaleString("en-US")}
        {stat.suffix && <span className="bg-gradient-to-br from-brand-gold to-brand-terracotta bg-clip-text text-transparent">{stat.suffix}</span>}
      </span>
    </span>
  );
}
