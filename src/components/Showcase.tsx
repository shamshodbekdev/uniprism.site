import { AnimatePresence, m, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SHOWCASE } from "../content";
import { FeatureIcon } from "./icons";
import { EASE_OUT, fadeUp, inView } from "./motion";
import { Phone } from "./Phone";
import { Accent, Container, SectionHeader } from "./primitives";

const AUTOPLAY_MS = 6000;

/**
 * "Inside the app": tabs on one side, the matching real screenshot on a
 * phone on the other. Tabs auto-advance while the section is on screen and
 * stop for good once the visitor picks one.
 */
export function Showcase() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "-20% 0px" });

  useEffect(() => {
    if (!autoplay || !visible) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % SHOWCASE.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, autoplay, visible]);

  const item = SHOWCASE[active];

  return (
    <section id="showcase" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-full bg-[linear-gradient(180deg,transparent,rgba(240,235,227,0.9)_20%,rgba(240,235,227,0.9)_80%,transparent)]"
      />
      <Container>
        <SectionHeader
          eyebrow="Inside the app"
          title={
            <>
              Built for the way <Accent>students actually apply</Accent>
            </>
          }
          description="Real screens from UniPrism. Every tool opens in one tap from Telegram, on any phone or desktop."
        />

        <div ref={ref} className="mt-14 grid items-center gap-12 sm:mt-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          {/* Tabs */}
          <m.div {...inView} variants={fadeUp} role="tablist" aria-label="App features" className="grid grid-cols-2 gap-2.5 lg:grid-cols-1 lg:gap-3">
            {SHOWCASE.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.title}
                  type="button"
                  role="tab"
                  id={`showcase-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="showcase-panel"
                  onClick={() => {
                    setActive(i);
                    setAutoplay(false);
                  }}
                  className={`relative flex items-center gap-3 overflow-hidden rounded-2xl border p-3 text-left transition-all duration-300 sm:p-4 ${
                    selected
                      ? "border-brand-terracotta/20 bg-white shadow-[0_18px_40px_-20px_rgba(198,93,59,0.45)]"
                      : "border-transparent bg-white/40 hover:bg-white/70"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300 sm:h-11 sm:w-11 ${
                      selected ? "bg-gradient-to-br from-[#D46A46] to-[#B4502F] text-white" : "bg-brand-ink/[0.05] text-brand-ink/60"
                    }`}
                  >
                    <FeatureIcon name={s.icon} size={22} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-sora text-[0.92rem] font-semibold tracking-[-0.02em] text-brand-ink sm:text-base">
                      {s.title}
                    </span>
                    <span className="hidden text-sm text-brand-ink/50 lg:line-clamp-1">{s.description}</span>
                  </span>
                  {selected && autoplay && visible && (
                    <m.span
                      key={`progress-${active}`}
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-gold to-brand-terracotta"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              );
            })}
          </m.div>

          {/* Phone */}
          <m.div {...inView} variants={fadeUp} className="relative mx-auto w-[250px] sm:w-[280px]">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -z-10 h-[85%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(232,163,61,0.35),transparent)] blur-2xl"
            />
            <Phone screen={item.screen} alt={`UniPrism app: ${item.title} screen`} />
          </m.div>

          {/* Details */}
          <div id="showcase-panel" role="tabpanel" aria-labelledby={`showcase-tab-${active}`} className="min-h-[15rem]">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="text-center lg:text-left"
              >
                <h3 className="font-sora text-2xl font-semibold tracking-[-0.03em] text-brand-ink sm:text-[1.75rem]">
                  {item.title}
                </h3>
                <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-brand-ink/60 lg:mx-0">{item.description}</p>
                <ul className="mx-auto mt-6 inline-flex flex-col gap-3 text-left lg:mx-0">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[0.95rem] text-brand-ink/80">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-terracotta text-white">
                        <Check className="h-3 w-3" strokeWidth={3.5} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
