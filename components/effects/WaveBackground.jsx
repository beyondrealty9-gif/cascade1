'use client';

/**
 * WaveBackground
 * ----------------
 * Lightweight, GPU-cheap animated water waves using layered SVG paths.
 * Works on ANY section background (dark hero OR white content sections)
 * by swapping the `theme` prop.
 *
 * Usage:
 *   <section className="relative overflow-hidden">
 *     <WaveBackground theme="white" />
 *     <div className="relative z-10">...your content...</div>
 *   </section>
 *
 * Why SVG + CSS instead of Canvas/WebGL here:
 * - Zero JS animation loop -> no main-thread cost, animates on compositor
 * - Scales infinitely, crisp on retina
 * - Respects prefers-reduced-motion automatically
 */

const THEMES = {
  // For hero / dark blue sections (river blue tones)
  ocean: {
    layers: ['#0b3d5c', '#12557d', '#1c74a8', '#2f93cf'],
    opacity: [0.9, 0.6, 0.4, 0.25],
  },
  // For white / light content sections - subtle, low-contrast waves
  white: {
    layers: ['#dbeafe', '#bfdbfe', '#93c5fd'],
    opacity: [0.5, 0.35, 0.2],
  },
};

export default function WaveBackground({
  theme = 'ocean',
  height = 220,          // px height of the wave band
  position = 'bottom',   // 'bottom' | 'top'
  className = '',
}) {
  const config = THEMES[theme] || THEMES.ocean;

  return (
    <div
      className={`pointer-events-none absolute left-0 right-0 z-0 overflow-hidden ${
        position === 'bottom' ? 'bottom-0' : 'top-0 rotate-180'
      } ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {config.layers.map((color, i) => (
        <svg
          key={i}
          className="wave-layer absolute bottom-0 left-0 w-[200%] h-full"
          style={{
            // each layer scrolls at a different speed/direction -> parallax
            animationDuration: `${18 - i * 3}s`,
            animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
            opacity: config.opacity[i],
          }}
          viewBox="0 0 2400 300"
          preserveAspectRatio="none"
        >
          <path
            fill={color}
            d="M0,150 C300,220 600,80 900,150 C1200,220 1500,80 1800,150 C2000,200 2200,100 2400,150 L2400,300 L0,300 Z"
          />
        </svg>
      ))}

      {/* subtle foam/highlight line at the crest for realism */}
      <svg
        className="absolute bottom-[40%] left-0 w-[200%] h-8 wave-layer"
        style={{ animationDuration: '10s' }}
        viewBox="0 0 2400 40"
        preserveAspectRatio="none"
      >
        <path
          d="M0,20 C300,35 600,5 900,20 C1200,35 1500,5 1800,20 C2000,30 2200,10 2400,20"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="3"
        />
      </svg>

      <style jsx>{`
        .wave-layer {
          animation-name: wave-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        @keyframes wave-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wave-layer { animation: none; }
        }
      `}</style>
    </div>
  );
}
