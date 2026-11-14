import { UNIVERSITIES } from "../content";
import { Container } from "./primitives";

/** Endless band of university names under the hero (pure CSS animation). */
export function Marquee() {
  const row = [...UNIVERSITIES, ...UNIVERSITIES];
  return (
    <section aria-label="Universities you can explore" className="relative py-8 sm:py-10">
      <Container>
        <p className="text-center text-[0.8rem] font-medium uppercase tracking-[0.2em] text-brand-ink/40">
          Explore 1,002 universities, from
        </p>
      </Container>
      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="landing-marquee flex w-max items-center gap-12 pr-12 sm:gap-16 sm:pr-16">
          {row.map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= UNIVERSITIES.length ? true : undefined}
              className="flex shrink-0 items-center gap-12 whitespace-nowrap font-sora text-lg font-semibold tracking-[-0.03em] text-brand-ink/35 sm:gap-16 sm:text-[1.35rem]"
            >
              {name}
              <span className="h-1.5 w-1.5 rotate-45 bg-brand-gold/60" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
