// Altura mark: a peak drawn as a chevron with a summit dot, then the wordmark.
// Drawn in currentColor; the header and footer sit on dark backgrounds.
export default function Logo({ className = "", label }) {
  return (
    <svg className={className} viewBox="0 0 290 40" role="img" aria-label={label}>
      <path d="M3 34L19 8l16 26" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="19" cy="22" r="4" fill="var(--brand-2)" />
      <text x="48" y="30" fill="currentColor" className="logo-word">
        ALTURA
        <tspan className="logo-sub" dx="10">ADVISORS</tspan>
      </text>
    </svg>
  );
}
