"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { LIVERY_HYPERSPEED } from "@/components/racing/hyperspeedOptions";
import { carYield } from "@/components/racing/carYield";

const Hyperspeed = dynamic(() => import("@/components/racing/Hyperspeed"), {
  ssr: false,
});

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
};

/**
 * The Contact "finish straight" — a Hyperspeed warp behind the contact card on
 * capable dark desktops. Mounts only while Contact is in view and stands the
 * page-wide car down first (car-yield) so just one WebGL context runs.
 */
const ContactWarp = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [capable, setCapable] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [near, setNear] = useState(false);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    setCapable(!reduced && wide && hasWebGL());

    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), {
      rootMargin: "-10% 0px -10% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, [capable]);

  const active = capable && isDark && near;

  useEffect(() => {
    if (active) {
      carYield.set("contact", true);
      const t = setTimeout(() => setMount(true), 220);
      return () => clearTimeout(t);
    }
    setMount(false);
    const t = setTimeout(() => carYield.set("contact", false), 220);
    return () => clearTimeout(t);
  }, [active]);

  if (!capable) return null;

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      {mount && (
        <div className="absolute inset-0 opacity-80">
          <Hyperspeed effectOptions={LIVERY_HYPERSPEED} />
        </div>
      )}
    </div>
  );
};

export default ContactWarp;
