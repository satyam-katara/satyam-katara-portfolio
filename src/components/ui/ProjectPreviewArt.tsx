import type { Project } from "@/data/content";

/**
 * Generated abstract preview art — a deterministic SVG chart motif per
 * project slug. Never labeled as real data; purely decorative.
 */
const MOTIFS = ["line", "bars", "area", "donut"] as const;

function motifFor(slug: string): (typeof MOTIFS)[number] {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return MOTIFS[h % MOTIFS.length];
}

export function ProjectPreviewArt({ project }: { project: Project }) {
  const motif = motifFor(project.slug);
  const gid = `g-${project.slug}`;
  return (
    <svg
      viewBox="0 0 400 225"
      className="h-full w-full"
      role="img"
      aria-label={project.preview.alt}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill={`url(#${gid})`} />
      {motif === "line" && (
        <g>
          <polyline
            points="20,180 70,150 120,165 170,110 220,130 270,80 320,95 380,50"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="3"
          />
          {[20, 70, 120, 170, 220, 270, 320, 380].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy={[180, 150, 165, 110, 130, 80, 95, 50][i]}
              r="4"
              fill="#22d3ee"
            />
          ))}
        </g>
      )}
      {motif === "bars" && (
        <g fill="#3b82f6" opacity="0.75">
          {[60, 110, 85, 140, 105, 160, 130, 175].map((h, i) => (
            <rect
              key={i}
              x={30 + i * 44}
              y={200 - h}
              width="28"
              height={h}
              rx="4"
              opacity={0.45 + (i % 3) * 0.2}
            />
          ))}
        </g>
      )}
      {motif === "area" && (
        <path
          d="M0,180 C60,150 90,170 140,130 C190,95 230,140 290,90 C330,60 360,80 400,50 L400,225 L0,225 Z"
          fill="#22d3ee"
          opacity="0.25"
        />
      )}
      {motif === "donut" && (
        <g transform="translate(200,112)">
          <circle r="70" fill="none" stroke="#3b82f6" strokeWidth="26" opacity="0.7" strokeDasharray="200 240" />
          <circle r="70" fill="none" stroke="#22d3ee" strokeWidth="26" opacity="0.8" strokeDasharray="120 320" strokeDashoffset="-200" />
          <circle r="70" fill="none" stroke="#8b5cf6" strokeWidth="26" opacity="0.6" strokeDasharray="60 380" strokeDashoffset="-320" />
        </g>
      )}
      {/* Faint grid overlay */}
      <g stroke="#ffffff" strokeOpacity="0.05">
        {[45, 90, 135, 180].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} />
        ))}
      </g>
    </svg>
  );
}
