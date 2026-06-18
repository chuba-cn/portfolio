"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy, client-only: keeps three.js out of the SSR/first-paint path so it never
// costs us LCP. The static grid/glow background renders regardless.
const ShaderField = dynamic(() => import("./ShaderField"), { ssr: false });

/**
 * Decides whether the animated GLSL background should run. It enhances the
 * static GridBackground only where it actually looks good and is welcome:
 *   - dark mode only — the carbon/speed-streak aesthetic muddies a light page,
 *     which stays crisp and editorial
 *   - capable desktops — reduced-motion off, fine pointer, wide viewport, WebGL
 * In every other case the static background already carries the look, so we
 * render nothing. Theme is tracked live so toggling light/dark mounts and frees
 * the WebGL context accordingly.
 */
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

const ShaderBackground = () => {
  const [capable, setCapable] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wideEnough = window.matchMedia("(min-width: 1024px)").matches;
    setCapable(!reduced && finePointer && wideEnough && hasWebGL());

    const root = document.documentElement;
    const sync = () => setDark(root.classList.contains("dark"));
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (!capable || !dark) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20">
      <ShaderField />
    </div>
  );
};

export default ShaderBackground;
