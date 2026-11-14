/**
 * Hand-built icon set for the landing page.
 *
 * Feature icons are duotone: a soft tinted body (`--duo` fill, 0.18 opacity
 * by default) under a crisp 1.6px outline, so they read as illustrations
 * rather than generic line icons. They draw in `currentColor`, which lets
 * the surrounding tile decide the palette. Small UI glyphs (arrows,
 * chevrons, checks) come from lucide-react.
 */

import type { SVGProps } from "react";

type SvgProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...rest }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Tinted body layer of a duotone icon. */
const DUO = { fill: "currentColor", fillOpacity: 0.18, stroke: "none" } as const;

const FEATURE_ICONS = {
  // Document with a score ring and highlighted lines
  essay: (
    <>
      <path {...DUO} d="M6 2.75h8.2L19 7.6V19.5a1.75 1.75 0 0 1-1.75 1.75H6.75A1.75 1.75 0 0 1 5 19.5V4.5A1.75 1.75 0 0 1 6.75 2.75Z" />
      <path d="M14 2.75H6.75A1.75 1.75 0 0 0 5 4.5v15a1.75 1.75 0 0 0 1.75 1.75h4.5" />
      <path d="M14 2.75 19 7.75V10" />
      <path d="M14 2.75v3.5c0 .83.67 1.5 1.5 1.5H19" />
      <path d="M8.25 10.5h5M8.25 13.5h3" />
      <circle cx="16.75" cy="17" r="3.75" />
      <path d="m15.2 17 1.1 1.1 2.1-2.2" />
    </>
  ),
  // Concentric target with an arrow landing in the bullseye
  target: (
    <>
      <circle {...DUO} cx="11" cy="13" r="8.25" />
      <circle cx="11" cy="13" r="8.25" />
      <circle cx="11" cy="13" r="4.5" />
      <circle cx="11" cy="13" r="1" fill="currentColor" />
      <path d="m11 13 8.5-8.5" />
      <path d="M17 3.75v3.25h3.25L22 5.25h-3.25V2Z" fill="currentColor" fillOpacity={0.35} />
    </>
  ),
  // Graduation cap with a coin, i.e. funded study
  scholarship: (
    <>
      <path {...DUO} d="M12 3.5 2.5 8.25 12 13l9.5-4.75Z" />
      <path d="M12 3.5 2.5 8.25 12 13l9.5-4.75Z" />
      <path d="M6.25 10.25v4.5c0 1.5 2.6 3 5.75 3" />
      <path d="M21.5 8.25v4.25" />
      <circle cx="17.75" cy="17.25" r="3.5" />
      <path d="M17.75 15.75v3M16.9 16.5h1.35a.55.55 0 0 1 0 1.1h-.95a.55.55 0 0 0 0 1.1h1.4" strokeWidth={1.3} />
    </>
  ),
  // Globe with meridians and a location pin
  globe: (
    <>
      <circle {...DUO} cx="11" cy="12" r="8.75" />
      <path d="M19.4 9.5A8.75 8.75 0 1 0 13.5 20.4" />
      <path d="M2.5 12h8.5M11 3.25c-2.3 2.4-3.5 5.3-3.5 8.75s1.2 6.35 3.5 8.75M11 3.25c1.9 2 3.05 4.3 3.4 6.9" />
      <path d="M18.5 22s3.5-3.05 3.5-6a3.5 3.5 0 0 0-7 0c0 2.95 3.5 6 3.5 6Z" fill="currentColor" fillOpacity={0.3} />
      <circle cx="18.5" cy="16" r="1.1" />
    </>
  ),
  // Video tile with two participants
  study: (
    <>
      <rect {...DUO} x="2.25" y="4.5" width="14.5" height="13" rx="3" />
      <rect x="2.25" y="4.5" width="14.5" height="13" rx="3" />
      <path d="m16.75 9.5 4.1-2.35a.75.75 0 0 1 1.15.65v6.4a.75.75 0 0 1-1.15.65l-4.1-2.35" />
      <circle cx="7.25" cy="9.75" r="1.75" />
      <circle cx="12" cy="9.75" r="1.75" />
      <path d="M4.75 15.25c.4-1.35 1.35-2 2.5-2s2.1.65 2.5 2M9.5 15.25c.4-1.35 1.35-2 2.5-2s2.1.65 2.5 2" />
      <path d="M8 21h3" />
    </>
  ),
  // Lightning bolt inside a stopwatch
  bolt: (
    <>
      <circle {...DUO} cx="12" cy="13.5" r="8" />
      <circle cx="12" cy="13.5" r="8" />
      <path d="M10 2.5h4M12 2.5v3M18.4 6.6l1.35-1.35" />
      <path d="m12.9 8.75-3.4 5.25h3l-.9 4.25 3.4-5.25h-3Z" fill="currentColor" fillOpacity={0.35} />
    </>
  ),
  // Chat bubble with an AI spark
  spark: (
    <>
      <path {...DUO} d="M4.75 4h10.5A2.75 2.75 0 0 1 18 6.75v6.5A2.75 2.75 0 0 1 15.25 16H9.5l-4.25 3.5V16h-.5A2.75 2.75 0 0 1 2 13.25v-6.5A2.75 2.75 0 0 1 4.75 4Z" />
      <path d="M18 9.5v3.75A2.75 2.75 0 0 1 15.25 16H9.5l-4.25 3.5V16h-.5A2.75 2.75 0 0 1 2 13.25v-6.5A2.75 2.75 0 0 1 4.75 4H12" />
      <path d="M6.5 8.5h4M6.5 11.5h6" />
      <path d="M18.5 1.75c.3 1.85 1.15 2.7 3 3-1.85.3-2.7 1.15-3 3-.3-1.85-1.15-2.7-3-3 1.85-.3 2.7-1.15 3-3Z" fill="currentColor" fillOpacity={0.35} />
    </>
  ),
  // Gift box with ribbon
  gift: (
    <>
      <rect {...DUO} x="3.5" y="11" width="17" height="10" rx="1.75" />
      <rect x="2.5" y="7.5" width="19" height="3.5" rx="1.25" />
      <path d="M3.75 11v8.25c0 .97.78 1.75 1.75 1.75h13c.97 0 1.75-.78 1.75-1.75V11" />
      <path d="M12 7.5V21" />
      <path d="M12 7.5c-1-2.75-2.9-4.25-4.4-3.6-1.4.6-1 3.1 1.4 3.6Zm0 0c1-2.75 2.9-4.25 4.4-3.6 1.4.6 1 3.1-1.4 3.6Z" />
    </>
  ),
} as const;

export type FeatureIconName = keyof typeof FEATURE_ICONS;

export function FeatureIcon({ name, size = 26, className }: { name: FeatureIconName; size?: number; className?: string }) {
  return (
    <Svg size={size} className={className}>
      {FEATURE_ICONS[name]}
    </Svg>
  );
}

/* ------------------------------------------------------------------ */
/* Brand marks (filled)                                                */
/* ------------------------------------------------------------------ */

export function TelegramIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.05 3.24 2.98 10.2c-1.23.5-1.22 1.19-.22 1.5l4.64 1.45 1.78 5.47c.22.6.11.84.74.84.49 0 .7-.22.98-.49l2.3-2.23 4.78 3.53c.88.49 1.51.24 1.73-.82l3.14-14.79c.32-1.29-.49-1.87-1.82-1.42ZM8.6 14.06l9.06-5.72c.45-.27.87-.13.53.18l-7.76 7-.3 3.22Z"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <Svg size={size} className={className} strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function GithubIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}
