"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Site-wide Lenis smooth scroll. Mounts once, drives its own RAF loop, and
 * intercepts same-page hash links so the anchored nav glides to sections with
 * a header offset instead of jumping.
 *
 * Fully disabled when the user prefers reduced motion — native scrolling stays.
 */
const HEADER_OFFSET = 96; // matches scroll-margin-top in globals.css

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic — quick settle, no float
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Glide to in-page anchors instead of native jump.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -HEADER_OFFSET });
      history.replaceState(null, "", id);
    };

    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
};

export default SmoothScroll;
