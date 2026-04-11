/**
 * SectionDivider — seamless wave transition between a dark and light section.
 * direction: 'dark-to-light' | 'light-to-dark'
 */
export default function SectionDivider({ direction = 'dark-to-light' }) {
  const isDTL = direction === 'dark-to-light';
  return (
    <div
      className={`relative h-20 md:h-28 overflow-hidden -mt-1 -mb-1 ${isDTL ? 'bg-obsidian' : 'bg-white'}`}
      aria-hidden="true"
    >
      <svg
        className="absolute bottom-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={isDTL ? '#ffffff' : '#0A0B0D'}
        />
      </svg>
    </div>
  );
}