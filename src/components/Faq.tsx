import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

import { FAQS, LINKS } from "../content";
import { EASE_OUT, fadeUp, inView, stagger } from "./motion";
import { Container, SectionHeader } from "./primitives";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" className="relative scroll-mt-20 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            align="left"
            eyebrow="FAQ"
            title="Questions, answered"
            description={
              <>
                Can&apos;t find what you need?{" "}
                <a
                  href={LINKS.support}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-terracotta underline decoration-brand-terracotta/30 underline-offset-4 transition-colors hover:decoration-brand-terracotta"
                >
                  Message our support team
                </a>
                .
              </>
            }
          />
        </div>

        <m.ul {...inView} variants={stagger(0.06)} className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            const buttonId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <m.li
                key={faq.question}
                variants={fadeUp}
                className={`overflow-hidden rounded-3xl border transition-[background-color,border-color,box-shadow] duration-300 ${
                  isOpen
                    ? "border-brand-terracotta/20 bg-white shadow-[0_20px_44px_-24px_rgba(198,93,59,0.35)]"
                    : "border-brand-ink/[0.07] bg-white/50 hover:bg-white/80"
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7 sm:py-6"
                  >
                    <span className="font-sora text-[1.02rem] font-semibold tracking-[-0.02em] text-brand-ink sm:text-lg">
                      {faq.question}
                    </span>
                    <m.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                        isOpen ? "bg-brand-terracotta text-white" : "bg-brand-ink/[0.05] text-brand-ink"
                      }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.4} />
                    </m.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT }}
                    >
                      <p className="px-6 pb-6 pr-16 text-pretty leading-relaxed text-brand-ink/65 sm:px-7 sm:pr-20">{faq.answer}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.li>
            );
          })}
        </m.ul>
      </Container>
    </section>
  );
}
