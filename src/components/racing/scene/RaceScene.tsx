"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { carYield } from "../carYield";

// Lazy, client-only — three.js + model stay out of the SSR/first-paint path.
const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

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
 * Mounts the persistent page-wide car scene as a fixed layer behind all content
 * (content sits above via z-index; sections are translucent so the car shows
 * through). Runs only where it shines: dark mode, capable desktops. Light mode,
 * phones, reduced motion and no-WebGL get nothing here — the static layout
 * carries those, and the 3D payload is never fetched.
 */
const RaceScene = () => {
  const [capable, setCapable] = useState(false);
  const [isDark, setIsDark] = useState(true);
  // Hand off to other WebGL scenes (Experience drive, Contact warp): unmount the
  // page car while one of them owns the viewport, so only one context runs.
  const [yieldToExperience, setYieldToExperience] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wideEnough = window.matchMedia("(min-width: 1024px)").matches;
    setCapable(!reduced && wideEnough && hasWebGL());

    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    setYieldToExperience(carYield.active);
    const unsub = carYield.subscribe(() =>
      setYieldToExperience(carYield.active)
    );

    return () => {
      observer.disconnect();
      unsub();
    };
  }, []);

  if (!capable || !isDark || yieldToExperience) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -5 }}
    >
      <SceneCanvas />
    </div>
  );
};

export default RaceScene;
