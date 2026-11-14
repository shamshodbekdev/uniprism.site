import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { Suspense, lazy, useEffect } from "react";

import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Navbar } from "./components/Navbar";

// Everything below the fold ships in a separate chunk, so the hero paints
// from the smallest possible bundle. The import starts right away, in
// parallel with the hero's first render.
const BelowTheFold = lazy(() => import("./BelowTheFold"));

/**
 * The public landing page served at https://uniprism.site/.
 *
 * Sections: hero → university band → features → inside the app → how it
 * works → stats → stories → FAQ → closing CTA → footer. Copy lives in
 * ./content.ts.
 */
export default function Landing() {
  return (
    // LazyMotion + `m` components load only the DOM animation features this
    // page uses. `strict` makes an accidental full `motion` import fail
    // loudly. MotionConfig respects the OS "reduce motion" setting.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="overflow-x-clip">
          <Hero />
          <Marquee />
          <Suspense fallback={<div className="min-h-screen" />}>
            <BelowTheFold />
            <HashScroll />
          </Suspense>
        </main>
      </MotionConfig>
    </LazyMotion>
  );
}

/**
 * A deep link such as /#faq arrives before the lazy sections exist, so the
 * browser's own jump misses. Re-run it once they have rendered.
 */
function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    document.getElementById(id)?.scrollIntoView();
  }, []);
  return null;
}
