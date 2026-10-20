export function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 11l6-6M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Mail({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 5.5l7 5.5 7-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function Phone({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6.6 3h-2A1.6 1.6 0 003 4.7C3.4 11 9 16.6 15.3 17a1.6 1.6 0 001.7-1.6v-2l-3.2-1.4-1.6 1.6a10 10 0 01-4.8-4.8L9 7.2 7.6 4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Pin({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 17.5s5.5-5 5.5-9.5a5.5 5.5 0 10-11 0c0 4.5 5.5 9.5 5.5 9.5z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function LinkedIn({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M4.4 7.3h2.7V16H4.4zM5.75 3a1.55 1.55 0 110 3.1 1.55 1.55 0 010-3.1zM8.8 7.3h2.6v1.2h.04c.36-.68 1.24-1.4 2.56-1.4 2.74 0 3.25 1.8 3.25 4.15V16h-2.7v-4.2c0-1 0-2.3-1.4-2.3s-1.62 1.1-1.62 2.22V16H8.8z" />
    </svg>
  );
}
