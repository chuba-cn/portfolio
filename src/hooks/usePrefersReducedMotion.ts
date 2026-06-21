"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's `prefers-reduced-motion` setting.
 * Returns `true` when the user has asked the system to minimize motion.
 *
 * Used across the racing layer to gate Lenis smooth-scroll, the lights-out
 * loader sequence, the telemetry cursor, and any GPU-driven background so the
 * site stays accessible and calm for those who need it.
 */
export function usePrefersReducedMotion(): boolean {
  // Default to "reduced" until mounted so SSR never ships motion the user opted out of.
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
