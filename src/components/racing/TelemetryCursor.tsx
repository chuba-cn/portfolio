"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * A telemetry-style reticle cursor for fine-pointer (desktop) devices.
 * A precise center dot tracks the pointer exactly; a lagged crosshair ring
 * trails behind and expands over interactive elements.
 *
 * Skipped on touch/coarse pointers and for reduced-motion users, where the
 * native cursor is left untouched.
 */
const TelemetryCursor = () => {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Raw pointer position (center dot tracks this exactly).
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Lagged ring.
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);
    document.body.classList.add("cursor-none-fine");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const interactive = (e.target as HTMLElement)?.closest?.(
        'a, button, [role="button"], input, textarea, select'
      );
      setHovering(Boolean(interactive));
    };

    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.body.classList.remove("cursor-none-fine");
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Center dot — exact */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-color-1"
        style={{ x, y }}
      />
      {/* Crosshair ring — lagged */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] -translate-x-1/2 -translate-y-1/2"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div
          className="relative h-8 w-8 rounded-full border transition-colors duration-200"
          style={{
            borderColor: hovering
              ? "rgb(var(--accent-rgb, 172 106 255))"
              : "rgba(172,106,255,0.55)",
          }}
        >
          {/* Crosshair ticks */}
          <span className="absolute left-1/2 top-0 h-1 w-px -translate-x-1/2 bg-color-1" />
          <span className="absolute left-1/2 bottom-0 h-1 w-px -translate-x-1/2 bg-color-1" />
          <span className="absolute top-1/2 left-0 h-px w-1 -translate-y-1/2 bg-color-1" />
          <span className="absolute top-1/2 right-0 h-px w-1 -translate-y-1/2 bg-color-1" />
        </div>
      </motion.div>
    </>
  );
};

export default TelemetryCursor;
