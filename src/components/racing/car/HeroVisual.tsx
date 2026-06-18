"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy, client-only — three.js stays out of the SSR/first-paint path, so the
// 3D car never blocks LCP. The hero copy and the fallback render immediately.
const CarHero = dynamic(() => import("./CarHero"), { ssr: false });

const hasWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
};

/**
 * Hero centerpiece: a 3D race car on capable, motion-friendly viewports
 * (>=768px + WebGL + reduced-motion off). Everywhere else — phones, reduced
 * motion, no WebGL — it gracefully falls back to the framed portrait, so the
 * hero is always polished and the page never pays for WebGL it can't use.
 */
const HeroVisual = ({ fallback }: { fallback: React.ReactNode }) => {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wideEnough = window.matchMedia("(min-width: 768px)").matches;
    setUse3D(!reduced && wideEnough && hasWebGL());
  }, []);

  if (!use3D) return <>{fallback}</>;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <CarHero />
      {/* Telemetry frame around the stage */}
      <span className="pointer-events-none absolute -left-px -top-px h-6 w-6 rounded-tl-2xl border-l-2 border-t-2 border-color-1" />
      <span className="pointer-events-none absolute -right-px -bottom-px h-6 w-6 rounded-br-2xl border-b-2 border-r-2 border-color-1" />
      <span className="pointer-events-none absolute bottom-2 left-2 font-code text-[0.55rem] uppercase tracking-[0.25em] text-text-muted">
        No.7 · Live
      </span>
    </div>
  );
};

export default HeroVisual;
