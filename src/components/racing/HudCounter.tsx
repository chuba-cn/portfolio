"use client";

import { useEffect, useState } from "react";

/**
 * Counts up to a target on mount — used for the hero telemetry readouts, which
 * are always above the fold. Honors reduced motion by showing the final value
 * immediately. `delay` staggers the readouts.
 */
type Props = {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
};

const HudCounter = ({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
  delay = 0,
}: Props) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    let start = 0;
    const run = () => {
      const tick = (now: number) => {
        if (!start) start = now;
        const t = Math.min(1, (now - start) / (duration * 1000));
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(target * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const timer = setTimeout(run, delay * 1000);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, delay]);

  return (
    <span className="tabular-nums">
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export default HudCounter;
