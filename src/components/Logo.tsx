/**
 * UniPrism logo: a prism that splits one beam of light into the brand
 * colors, the idea being one student and many possible universities.
 * The same geometry is used for public/favicon.svg.
 */

import { useId } from "react";

interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 32, className }: LogoMarkProps) {
  // Unique per instance: the mark appears several times on the page.
  const clipId = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <rect width="32" height="32" rx="9" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="32" height="32" fill="#1A1A1A" />
        {/* Incoming white light */}
        <path d="M1 17.6L11.2 15" stroke="#FAF7F2" strokeWidth="1.6" strokeLinecap="round" />
        {/* Refracted beams */}
        <path d="M20.8 15L33 11" stroke="#C65D3B" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M20.8 15L33 17.4" stroke="#E8A33D" strokeWidth="2.2" strokeLinecap="round" />
        {/* Prism */}
        <path
          d="M16 6.5l9.5 17h-19z"
          fill="#FAF7F2"
          fillOpacity="0.1"
          stroke="#FAF7F2"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={32} />
      <span className="font-sora text-[1.2rem] font-semibold tracking-[-0.03em]">UniPrism</span>
    </span>
  );
}
