/**
 * Decorative, theme-aware background: a faint engineering grid plus soft accent
 * glows. Intensity is driven by --grid-opacity / --glow-opacity (set per theme in
 * globals.css), so it stays subtle in light mode and richer in dark mode.
 * Purely presentational — render once near the root, behind content.
 */
const GridBackground = () => {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--text) / var(--grid-opacity)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--text) / var(--grid-opacity)) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />
      {/* Accent glows */}
      <div
        className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, #AC6AFF 0%, transparent 70%)",
          opacity: "calc(0.25 * var(--glow-opacity))",
        }}
      />
      <div
        className="absolute top-[60vh] -right-40 h-[32rem] w-[32rem] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, #FFC876 0%, transparent 70%)",
          opacity: "calc(0.16 * var(--glow-opacity))",
        }}
      />
    </div>
  );
};

export default GridBackground;
