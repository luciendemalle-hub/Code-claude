export default function Logo({ size = 48, light = false }) {
  const main = light ? '#FAF7F2' : '#8B1A1A';
  const accent = light ? '#C9A84C' : '#C9A84C';
  const textColor = light ? '#FAF7F2' : '#8B1A1A';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="La Scala logo"
    >
      {/* Cherub body */}
      <ellipse cx="50" cy="62" rx="16" ry="13" fill={main} opacity="0.95" />
      {/* Head */}
      <circle cx="50" cy="40" r="12" fill={main} />
      {/* Curly hair */}
      <ellipse cx="42" cy="33" rx="5" ry="4" fill={main} opacity="0.8" />
      <ellipse cx="50" cy="30" rx="5" ry="4" fill={main} opacity="0.8" />
      <ellipse cx="58" cy="33" rx="5" ry="4" fill={main} opacity="0.8" />
      {/* Face details */}
      <circle cx="47" cy="39" r="1.2" fill={accent} opacity="0.7" />
      <circle cx="53" cy="39" r="1.2" fill={accent} opacity="0.7" />
      <ellipse cx="50" cy="43" rx="2.5" ry="1.2" fill={accent} opacity="0.5" />
      {/* Left wing */}
      <ellipse cx="29" cy="60" rx="14" ry="8" fill={main} opacity="0.6" transform="rotate(-20 29 60)" />
      <ellipse cx="25" cy="58" rx="10" ry="5" fill={main} opacity="0.4" transform="rotate(-25 25 58)" />
      {/* Right wing */}
      <ellipse cx="71" cy="60" rx="14" ry="8" fill={main} opacity="0.6" transform="rotate(20 71 60)" />
      <ellipse cx="75" cy="58" rx="10" ry="5" fill={main} opacity="0.4" transform="rotate(25 75 58)" />
      {/* Arms reaching out */}
      <ellipse cx="36" cy="65" rx="9" ry="4" fill={main} opacity="0.9" transform="rotate(-30 36 65)" />
      <ellipse cx="64" cy="65" rx="9" ry="4" fill={main} opacity="0.9" transform="rotate(30 64 65)" />
      {/* Fork / pasta swirl */}
      <line x1="62" y1="52" x2="66" y2="46" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="65" y1="54" x2="69" y2="48" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="59" y1="51" x2="63" y2="45" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      {/* Pasta swirl on plate suggestion */}
      <ellipse cx="50" cy="77" rx="18" ry="6" fill={main} opacity="0.25" />
      <path d="M38 77 Q44 72 50 77 Q56 82 62 77" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.8" />
    </svg>
  );
}
