"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

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
  // Hand off to the Experience drive scene: unmount the page car while the
  // Experience section owns the viewport, so only one GPU context runs.
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

    // The Experience drive scene tells us when it owns the viewport.
    const onExpScene = (e: Event) =>
      setYieldToExperience((e as CustomEvent<boolean>).detail);
    window.addEventListener("exp-scene", onExpScene as EventListener);

    return () => {
      observer.disconnect();
      window.removeEventListener("exp-scene", onExpScene as EventListener);
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
