/**
 * Shared Framer Motion presets so every section enters with the same rhythm.
 */

import type { Variants } from "framer-motion";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Fade + rise with a light blur; used for most elements on scroll. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

/** Parent variant that reveals its children one after another. */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Shared whileInView settings: animate once, slightly before fully visible. */
export const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-60px" },
} as const;
