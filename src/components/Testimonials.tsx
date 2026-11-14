import { m } from "framer-motion";

import { TESTIMONIALS, TESTIMONIALS_ILLUSTRATIVE, type Testimonial } from "../content";
import { fadeUp, inView, stagger } from "./motion";
import { Accent, Container, SectionHeader } from "./primitives";

/** Avatar gradients, cycled. Monograms avoid using anyone's photo. */
const AVATAR_TONES = [
  "from-[#E9825A] to-[#B4502F]",
  "from-[#F3C064] to-[#D98A26]",
  "from-[#6B5A4E] to-[#2A2622]",
  "from-[#E8A33D] to-[#C65D3B]",
  "from-[#C9A27E] to-[#8C6446]",
  "from-[#D46A46] to-[#7E3520]",
];

export function Testimonials() {
  return (
    <section id="stories" className="relative scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="Student stories"
          title={
            <>
              The counselor you <Accent>never had</Accent>
            </>
          }
          description="How students use UniPrism on the road to their dream university."
        />

        <m.ul {...inView} variants={stagger(0.08)} className="mt-14 columns-1 gap-5 sm:mt-16 md:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t, i) => (
            <Card key={t.name} testimonial={t} tone={AVATAR_TONES[i % AVATAR_TONES.length]} featured={i === 0} />
          ))}
        </m.ul>

        {TESTIMONIALS_ILLUSTRATIVE && (
          <p className="mt-8 text-center text-xs text-brand-ink/40">
            Illustrative stories based on common student journeys.
          </p>
        )}
      </Container>
    </section>
  );
}

function Card({ testimonial, tone, featured }: { testimonial: Testimonial; tone: string; featured: boolean }) {
  return (
    <m.li
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className={`mb-5 break-inside-avoid rounded-[1.75rem] border p-7 transition-shadow duration-500 hover:shadow-[0_24px_50px_-24px_rgba(60,30,15,0.35)] ${
        featured
          ? "border-transparent bg-gradient-to-br from-[#C65D3B] to-[#9E4528] text-white"
          : "border-brand-ink/[0.07] bg-white/70 backdrop-blur-sm"
      }`}
    >
      <svg width="28" height="22" viewBox="0 0 28 22" aria-hidden="true" className={featured ? "text-white/40" : "text-brand-gold"}>
        <path
          fill="currentColor"
          d="M0 22V13.6C0 6.1 4.1 1.4 11 0l1.3 3.2C8.4 4.5 6.4 7.2 6.2 10.6H11V22H0Zm16 0V13.6C16 6.1 20.1 1.4 27 0l1 3.2c-3.9 1.3-5.9 4-6.1 7.4H27V22H16Z"
        />
      </svg>
      <blockquote
        className={`mt-5 text-pretty font-sora leading-relaxed tracking-[-0.015em] ${
          featured ? "text-[1.2rem] text-white" : "text-[1.02rem] text-brand-ink/85"
        }`}
      >
        {testimonial.quote}
      </blockquote>
      <div className="mt-7 flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br font-sora text-sm font-semibold text-white ring-2 ${tone} ${
            featured ? "ring-white/30" : "ring-white"
          }`}
        >
          {testimonial.name.charAt(0)}
        </span>
        <div>
          <p className={`text-sm font-semibold ${featured ? "text-white" : "text-brand-ink"}`}>{testimonial.name}</p>
          <p className={`text-xs ${featured ? "text-white/65" : "text-brand-ink/50"}`}>{testimonial.detail}</p>
        </div>
      </div>
    </m.li>
  );
}
