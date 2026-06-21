"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "motion/react";

/**
 * A fixed telemetry rail on the right edge that turns page scroll into live
 * race-timing: a filled progress track, a moving marker, sector ticks, and a
 * mono percentage readout. Desktop only (hidden under lg). The spring is the
 * only animated part; reduced-motion users still get an accurate static
 * position because useScroll reflects the real scroll offset.
 */
const SECTORS = 4;

const TelemetryRail = () => {
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  const markerTop = useTransform(fill, (v) => `${v * 100}%`);
  const [pct, setPct] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setPct(Math.round(v * 100))
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center lg:gap-3"
    >
      <span className="font-code text-[0.55rem] uppercase tracking-[0.3em] text-text-muted [writing-mode:vertical-rl]">
        Telemetry
      </span>

      <div className="relative h-48 w-px bg-stroke">
        {/* Filled progress */}
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-color-1"
          style={{ scaleY: fill, height: "100%" }}
        />
        {/* Sector ticks */}
        {Array.from({ length: SECTORS - 1 }).map((_, i) => (
          <span
            key={i}
            className="absolute -left-1 h-px w-2.5 bg-stroke"
            style={{ top: `${((i + 1) / SECTORS) * 100}%` }}
          />
        ))}
        {/* Marker */}
        <motion.span
          className="absolute -left-[3px] h-1.5 w-1.5 rounded-full bg-color-1 shadow-[0_0_8px_rgba(172,106,255,0.9)]"
          style={{ top: markerTop, translateY: "-50%" }}
        />
      </div>

      <span className="font-code text-[0.6rem] font-bold tabular-nums tracking-wider text-text">
        {String(pct).padStart(2, "0")}%
      </span>
    </div>
  );
};

export default TelemetryRail;
