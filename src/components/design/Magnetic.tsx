"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Pulls its child toward the cursor while hovered (and springs back on leave) —
 * the classic "magnetic" button feel. Inert on touch (no mousemove) and for
 * reduced-motion users, where it renders the child untouched.
 */
const Magnetic = ({
  children,
  className = "",
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  if (reduced) {
    return <span className={`inline-flex ${className}`}>{children}</span>;
  }

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
