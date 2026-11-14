/**
 * iPhone-style device frame that shows real app screenshots. The screen
 * cross-fades whenever `screen` changes.
 */

import { AnimatePresence, m } from "framer-motion";

import { screenSrc, type ScreenName } from "../content";

interface PhoneProps {
  screen: ScreenName;
  alt: string;
  /** Load the first screenshot eagerly (hero, above the fold). */
  priority?: boolean;
  className?: string;
}

export function Phone({ screen, alt, priority = false, className = "" }: PhoneProps) {
  const img = screenSrc(screen);
  return (
    <div
      className={`relative aspect-[780/1760] rounded-[3rem] bg-gradient-to-b from-[#2B2724] via-[#141210] to-[#2B2724] p-[0.6rem] shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_2px_1px_rgba(255,255,255,0.15)_inset,0_50px_100px_-30px_rgba(60,30,15,0.55),0_30px_60px_-30px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/* Side buttons */}
      <span aria-hidden="true" className="absolute -left-[3px] top-[18%] h-[7%] w-[3px] rounded-l bg-[#2B2724]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[28%] h-[11%] w-[3px] rounded-l bg-[#2B2724]" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[24%] h-[14%] w-[3px] rounded-r bg-[#2B2724]" />

      <div className="relative h-full w-full overflow-hidden rounded-[2.45rem] bg-[#FAF7F2]">
        {/* Status bar */}
        <div className="absolute inset-x-0 top-0 z-20 flex h-[4.8%] items-center justify-between px-[9%] text-[0.62rem] font-semibold text-brand-ink">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="flex items-end gap-[1.5px]">
              {[3, 5, 7, 9].map((h) => (
                <span key={h} className="w-[2.5px] rounded-sm bg-brand-ink" style={{ height: h }} />
              ))}
            </span>
            <span className="ml-1 h-[9px] w-[18px] rounded-[3px] border border-brand-ink/70 p-[1px]">
              <span className="block h-full w-3/4 rounded-[1.5px] bg-brand-ink" />
            </span>
          </span>
        </div>
        {/* Dynamic island */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[1.2%] z-30 h-[2.9%] w-[31%] -translate-x-1/2 rounded-full bg-black"
        />

        <div className="absolute inset-x-0 bottom-0 top-[4.8%]">
          <AnimatePresence initial={false} mode="popLayout">
            <m.img
              key={screen}
              src={img.src}
              srcSet={img.srcSet}
              sizes="(min-width: 1024px) 320px, 280px"
              alt={alt}
              width={780}
              height={1688}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              {...(priority ? { fetchPriority: "high" as const } : {})}
              initial={{ opacity: 0, scale: 1.04, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover object-top"
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* Glass glare */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(115deg,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_28%,rgba(255,255,255,0)_70%,rgba(255,255,255,0.12)_100%)]"
        />
      </div>
    </div>
  );
}
