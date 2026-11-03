export function BrandMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="1" width="38" height="38" rx="12" fill="#111711" stroke="rgba(193,255,131,.22)" />
      <path d="M20 7.5 30.8 13.7v12.5L20 32.5 9.2 26.2V13.7L20 7.5Z" stroke="#c1ff83" strokeWidth="1.4" />
      <path d="M13.5 17.2 20 13.5l6.5 3.7v7.6L20 28.5l-6.5-3.7v-7.6Z" stroke="#c1ff83" strokeWidth="1.1" opacity=".65" />
      <circle cx="20" cy="20" r="2.5" fill="#c1ff83" />
      <path d="m20 22.5 0 5m-5.3-7.8 5.3 2.8 5.3-2.8" stroke="#c1ff83" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}
