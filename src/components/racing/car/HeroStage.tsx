"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy, client-only — three.js + the model stay out of the SSR/first-paint path
// so the hero text is the LCP and never waits on WebGL.
const CarStage = dynamic(() => import("./CarStage"), { ssr: false });

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
 * The full-bleed hero stage. The cinematic 3D car scene runs only where it
 * truly shines: dark mode, on capable desktops (>=1024px + WebGL +
 * reduced-motion off). The moody garage washes out on a light page, so light
 * mode — like phones, reduced motion and no-WebGL — gets a clean static
 * backdrop and the 3D payload is never fetched. Theme is tracked live so
 * toggling to light frees the WebGL context.
 */
const HeroStage = () => {
  const [capable, setCapable] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wideEnough = window.matchMedia("(min-width: 1024px)").matches;
    setCapable(!reduced && wideEnough && hasWebGL());

    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (!capable || !isDark) {
    // Lightweight static backdrop (grid comes from the global GridBackground).
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, #AC6AFF 0%, transparent 70%)",
            opacity: "calc(0.22 * var(--glow-opacity))",
          }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden className="absolute inset-0">
      <CarStage isDark={isDark} />
    </div>
  );
};

export default HeroStage;
