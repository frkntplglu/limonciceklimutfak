type IconProps = React.SVGProps<SVGSVGElement>;

/** Beş yapraklı limon çiçeği — markanın ana motifi */
export function LemonBlossom(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden {...props}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <path
          key={deg}
          transform={`rotate(${deg} 32 32)`}
          d="M32 31C25.5 25 24.5 13.5 32 6c7.5 7.5 6.5 19 0 25Z"
          fill="var(--color-blossom)"
          stroke="var(--color-olive)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      ))}
      <circle cx="32" cy="32" r="6.5" fill="var(--color-lemon)" stroke="var(--color-olive)" strokeWidth="1.6" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <circle key={deg} transform={`rotate(${deg} 32 32)`} cx="32" cy="22.5" r="1.4" fill="var(--color-clay)" />
      ))}
    </svg>
  );
}

export function Lemon(props: IconProps) {
  return (
    <svg viewBox="0 0 80 64" fill="none" aria-hidden {...props}>
      <path
        d="M58 14c4-5 10-6 14-5-1 5-4 9-9 11"
        fill="var(--color-leaf)"
        stroke="var(--color-olive)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 36c-3-2-4-5-3-7 2-1 4-1 6 0 4-11 17-18 30-17 13 0 22 7 23 17 2 0 4 0 5 2 0 2-1 5-4 6-3 12-17 19-31 17C24 52 13 46 9 36Z"
        fill="var(--color-lemon)"
        stroke="var(--color-olive)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M24 26c4-4 11-6 17-5" stroke="var(--color-paper)" strokeWidth="2.4" strokeLinecap="round" opacity=".8" />
    </svg>
  );
}

export function Leaf(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden {...props}>
      <path
        d="M6 42C6 22 20 8 42 6c0 22-14 36-36 36Z"
        fill="var(--color-leaf)"
        stroke="var(--color-olive)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M6 42 30 18" stroke="var(--color-olive)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.08.8.82-3-.2-.31a8.2 8.2 0 1 1 6.94 3.84Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.96-.14.17-.29.19-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.73 2.73 0 0 0-.85 2.03 4.74 4.74 0 0 0 1 2.52 10.86 10.86 0 0 0 4.16 3.67c1.55.67 2.16.73 2.93.61.47-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
