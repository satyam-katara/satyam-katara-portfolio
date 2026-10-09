/**
 * Fallback3D — static SVG/CSS visual used whenever the WebGL scene
 * can't or shouldn't run: WebGL unsupported, prefers-reduced-motion,
 * low-power devices, or a runtime error in the 3D scene.
 * Purely decorative (aria-hidden).
 */
export function Fallback3D() {
  return (
    <div aria-hidden="true" className="relative h-full w-full">
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full"
        role="img"
        aria-label="Abstract data network illustration"
      >
        <defs>
          <radialGradient id="fb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="url(#fb-glow)" />
        {/* Orbit rings */}
        <ellipse cx="200" cy="200" rx="150" ry="58" fill="none" stroke="#3b82f6" strokeOpacity="0.35" />
        <ellipse cx="200" cy="200" rx="150" ry="58" fill="none" stroke="#3b82f6" strokeOpacity="0.2" transform="rotate(60 200 200)" />
        <ellipse cx="200" cy="200" rx="150" ry="58" fill="none" stroke="#22d3ee" strokeOpacity="0.18" transform="rotate(120 200 200)" />
        {/* Links */}
        <g stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1">
          <line x1="200" y1="120" x2="270" y2="170" />
          <line x1="270" y1="170" x2="250" y2="260" />
          <line x1="250" y1="260" x2="150" y2="250" />
          <line x1="150" y1="250" x2="130" y2="170" />
          <line x1="130" y1="170" x2="200" y2="120" />
          <line x1="200" y1="200" x2="200" y2="120" />
          <line x1="200" y1="200" x2="270" y2="170" />
          <line x1="200" y1="200" x2="250" y2="260" />
          <line x1="200" y1="200" x2="150" y2="250" />
          <line x1="200" y1="200" x2="130" y2="170" />
        </g>
        {/* Nodes */}
        <g fill="#22d3ee">
          <circle cx="200" cy="120" r="5" />
          <circle cx="270" cy="170" r="4" />
          <circle cx="250" cy="260" r="5" />
          <circle cx="150" cy="250" r="4" />
          <circle cx="130" cy="170" r="5" />
          <circle cx="200" cy="200" r="7" fill="#3b82f6" />
        </g>
      </svg>
      {/* Subtle animated chart lines around the visual (CSS only) */}
      <svg
        viewBox="0 0 200 60"
        className="absolute -left-4 top-8 w-40 opacity-40"
        aria-hidden="true"
      >
        <polyline
          points="0,45 25,38 50,42 75,28 100,32 125,18 150,24 175,10 200,14"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
        />
      </svg>
      <svg
        viewBox="0 0 200 60"
        className="absolute -right-2 bottom-10 w-44 opacity-30"
        aria-hidden="true"
      >
        <g fill="#8b5cf6">
          <rect x="10" y="30" width="14" height="30" rx="2" />
          <rect x="32" y="20" width="14" height="40" rx="2" />
          <rect x="54" y="36" width="14" height="24" rx="2" />
          <rect x="76" y="12" width="14" height="48" rx="2" />
          <rect x="98" y="26" width="14" height="34" rx="2" />
          <rect x="120" y="18" width="14" height="42" rx="2" />
        </g>
      </svg>
    </div>
  );
}
