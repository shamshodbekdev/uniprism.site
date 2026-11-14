/**
 * Sections below the hero, bundled as one lazily loaded chunk
 * (see Landing.tsx).
 */

import { Faq } from "./components/Faq";
import { Features } from "./components/Features";
import { FinalCta, Footer } from "./components/Footer";
import { HowItWorks } from "./components/HowItWorks";
import { Showcase } from "./components/Showcase";
import { Stats } from "./components/Stats";
import { Testimonials } from "./components/Testimonials";

export default function BelowTheFold() {
  return (
    <>
      <Features />
      <Showcase />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Footer />
    </>
  );
}
