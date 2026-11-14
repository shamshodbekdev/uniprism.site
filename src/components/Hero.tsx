import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Clock3, Sparkles } from "lucide-react";
import { useEffect, useState, type PointerEvent } from "react";

import { HERO_SCREENS } from "../content";
import { FeatureIcon } from "./icons";
import { EASE_OUT, fadeUp, stagger } from "./motion";
import { Phone } from "./Phone";
import { Accent, Container, GhostLink, TelegramButton } from "./primitives";

const TRUST = ["1,002 QS-ranked universities", "89 countries", "Free to start"];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-6 pt-28 sm:pt-36 lg:pb-12 lg:pt-40">
      <HeroBackdrop />

      <Container className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        <m.div initial="hidden" animate="visible" variants={stagger(0.11, 0.05)} className="text-center lg:text-left">
          <m.a
            variants={fadeUp}
            href="#showcase"
            className="group inline-flex items-center gap-2.5 rounded-full border border-brand-ink/[0.08] bg-white/70 py-1 pl-1 pr-3.5 text-[0.82rem] font-medium text-brand-ink/75 shadow-[0_1px_2px_rgba(26,26,26,0.04)] backdrop-blur-md transition-colors hover:border-brand-terracotta/30"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-ink px-2.5 py-1 text-[0.72rem] font-semibold text-brand-cream">
              <Sparkles className="h-3 w-3 text-brand-gold" strokeWidth={2.4} />
              New
            </span>
            Study Together video rooms are live
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </m.a>

          <m.h1
            variants={fadeUp}
            className="mx-auto mt-7 max-w-[13ch] text-balance font-sora text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.045em] text-brand-ink sm:text-6xl lg:mx-0 lg:text-[4.6rem]"
          >
            Your gateway to the world&apos;s <Accent>top universities</Accent>
          </m.h1>

          <m.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-brand-ink/60 sm:text-lg lg:mx-0"
          >
            Scholarships, AI essay feedback, an honest read on your profile and live study rooms.
            Everything a student applying abroad needs, in one app inside Telegram.
          </m.p>

          <m.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start"
          >
            <TelegramButton pulse />
            <GhostLink href="#how-it-works">See how it works</GhostLink>
          </m.div>

          <m.ul
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.85rem] text-brand-ink/55 lg:justify-start"
          >
            {TRUST.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-brand-terracotta/10 text-brand-terracotta">
                  <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                </span>
                {item}
              </li>
            ))}
          </m.ul>
        </m.div>

        <HeroDevice />
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Device: 3D tilted phone that follows the pointer                    */
/* ------------------------------------------------------------------ */

function HeroDevice() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % HERO_SCREENS.length), 3600);
    return () => window.clearInterval(id);
  }, []);

  // Pointer position in [-0.5, 0.5], smoothed with a spring.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-26, -4]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [12, 0]);
  const cardShiftX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const cardShiftY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const current = HERO_SCREENS[index];

  return (
    <m.div
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.2 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto w-full max-w-[460px] [perspective:1600px]"
    >
      {/* Halo */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_200deg,#E8A33D,#C65D3B,#F3C98B,#E8A33D)] opacity-40 blur-[70px]"
      />

      <m.div
        style={{ rotateY, rotateX }}
        className="relative mx-auto w-[248px] [transform-style:preserve-3d] sm:w-[292px] lg:w-[316px]"
      >
        <m.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
          <Phone screen={current.name} alt={`UniPrism app: ${current.label} screen`} priority />
        </m.div>
        {/* Floor shadow */}
        <div
          aria-hidden="true"
          className="mx-auto mt-6 h-6 w-[70%] rounded-[100%] bg-[radial-gradient(closest-side,rgba(80,40,20,0.28),transparent)] blur-md"
        />
      </m.div>

      {/* Screen indicator */}
      <div className="mt-2 flex items-center justify-center gap-2" aria-hidden="true">
        {HERO_SCREENS.map((s, i) => (
          <span
            key={s.name}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-6 bg-brand-terracotta" : "w-1.5 bg-brand-ink/15"
            }`}
          />
        ))}
      </div>

      {/* Floating glass cards */}
      <m.div style={{ x: cardShiftX, y: cardShiftY }} className="pointer-events-none absolute inset-0">
        <FloatCard className="-left-2 top-[14%] sm:-left-6" delay={0.9}>
          <ScoreRing value={82} />
          <div>
            <p className="text-[0.68rem] font-medium uppercase tracking-wider text-brand-ink/45">Profile strength</p>
            <p className="font-sora text-sm font-semibold text-brand-ink">Strong for UCL</p>
          </div>
        </FloatCard>

        <FloatCard className="-right-1 top-[46%] sm:-right-4" delay={1.15}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-gold to-[#D9773F] text-white shadow-[0_8px_16px_-6px_rgba(232,163,61,0.8)]">
            <FeatureIcon name="essay" size={22} />
          </span>
          <div>
            <p className="text-[0.68rem] font-medium uppercase tracking-wider text-brand-ink/45">Essay audit</p>
            <p className="font-sora text-sm font-semibold text-brand-ink">
              8.7<span className="text-brand-ink/40">/10</span>
            </p>
          </div>
        </FloatCard>

        <FloatCard className="bottom-[13%] left-0 sm:-left-2" delay={1.4}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-ink text-brand-gold">
            <Clock3 className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <p className="text-[0.68rem] font-medium uppercase tracking-wider text-brand-ink/45">DAAD Scholarship</p>
            <p className="font-sora text-sm font-semibold text-brand-ink">Deadline in 12 days</p>
          </div>
        </FloatCard>
      </m.div>
    </m.div>
  );
}

function FloatCard({ children, className, delay }: { children: React.ReactNode; className: string; delay: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
      className={`absolute ${className}`}
    >
      <div className="landing-float flex items-center gap-3 rounded-2xl border border-white/70 bg-white/65 py-2.5 pl-2.5 pr-4 shadow-[0_20px_40px_-16px_rgba(60,30,15,0.35)] backdrop-blur-xl">
        {children}
      </div>
    </m.div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative grid h-10 w-10 place-items-center">
      <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90" aria-hidden="true">
        <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(198,93,59,0.15)" strokeWidth="4" />
        <m.circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          stroke="url(#heroRing)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ duration: 1.6, delay: 1.2, ease: EASE_OUT }}
        />
        <defs>
          <linearGradient id="heroRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#E8A33D" />
            <stop offset="1" stopColor="#C65D3B" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-sora text-[0.7rem] font-bold text-brand-ink">{value}</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Backdrop: soft gradient orbs + masked grid + grain                  */
/* ------------------------------------------------------------------ */

function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -right-[10%] -top-[20%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(232,163,61,0.32),transparent)]" />
      <div className="absolute -left-[15%] top-[30%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(198,93,59,0.16),transparent)]" />
      <div className="landing-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-brand-cream" />
    </div>
  );
}
