/**
 * A Pirelli-style F1 tyre, drawn as SVG — black rubber with tread, the iconic
 * coloured sidewall band, and the compound letter on the rim. Used to label the
 * tech-stack groups by "compound". No images, no trademark, sharp at any size.
 */
export const COMPOUNDS = {
  soft: { color: "#E10600", letter: "S", name: "Soft" },
  medium: { color: "#FFD12E", letter: "M", name: "Medium" },
  hard: { color: "#F2F2F2", letter: "H", name: "Hard" },
  inter: { color: "#3BD16F", letter: "I", name: "Inter" },
  wet: { color: "#2E9BE6", letter: "W", name: "Wet" },
} as const;

export type Compound = keyof typeof COMPOUNDS;

const TREADS = Array.from({ length: 28 });

const TyreIcon = ({
  compound,
  size = 44,
  className = "",
}: {
  compound: Compound;
  size?: number;
  className?: string;
}) => {
  const { color, letter } = COMPOUNDS[compound];

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={`${COMPOUNDS[compound].name} compound tyre`}
    >
      {/* Rubber */}
      <circle cx="50" cy="50" r="48" fill="#0b0b11" />
      {/* Tread blocks */}
      <g stroke="#26262f" strokeWidth="2.2">
        {TREADS.map((_, i) => {
          const a = (i / TREADS.length) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={50 + Math.cos(a) * 48}
              y1={50 + Math.sin(a) * 48}
              x2={50 + Math.cos(a) * 42}
              y2={50 + Math.sin(a) * 42}
            />
          );
        })}
      </g>
      {/* Coloured sidewall band */}
      <circle
        cx="50"
        cy="50"
        r="37"
        fill="none"
        stroke={color}
        strokeWidth="5"
      />
      {/* Rim */}
      <circle
        cx="50"
        cy="50"
        r="30"
        fill="#15151c"
        stroke="#2c2c36"
        strokeWidth="1.5"
      />
      <circle cx="50" cy="50" r="7" fill="#0b0b11" stroke="#2c2c36" strokeWidth="1.5" />
      {/* Compound letter */}
      <text
        x="50"
        y="51"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-code, monospace)"
        fontWeight="700"
        fontSize="26"
        fill={color}
      >
        {letter}
      </text>
    </svg>
  );
};

export default TyreIcon;
