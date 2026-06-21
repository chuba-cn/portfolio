"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { LIVERY_HYPERSPEED } from "./hyperspeedOptions";

// Heavy WebGL backdrop — its own chunk, lazy so it doesn't block first paint.
// Disposes itself on unmount (forceContextLoss).
const Hyperspeed = dynamic(() => import("./Hyperspeed"), { ssr: false });

/**
 * "Lights out and away we go." — an F1 start-light gantry over a Hyperspeed
 * warp backdrop. The speed streaks rush behind while the five red columns
 * illuminate in sequence; they hold, then cut to black (lights out) and the
 * whole overlay lifts to reveal the site.
 *
 * Plays on every page load / hard reload. Skipped for reduced-motion. The warp
 * backdrop runs on capable (wide + WebGL) screens; otherwise it's just the
 * gantry on black. RaceScene holds the hero car off until this finishes so only
 * one WebGL context runs at a time.
 */
const COLUMNS = 5;

type Phase = "run" | "out" | "done";

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

const LightsOutLoader = () => {
  const [phase, setPhase] = useState<Phase>("run");
  const [lit, setLit] = useState(0);
  const [warp, setWarp] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setPhase("done");
      return;
    }

    setWarp(window.matchMedia("(min-width: 768px)").matches && hasWebGL());
    document.body.style.overflow = "hidden";
    const schedule = (fn: () => void, ms: number) =>
      timers.current.push(setTimeout(fn, ms));

    // Light each column in turn.
    for (let i = 1; i <= COLUMNS; i++) {
      schedule(() => setLit(i), 350 + (i - 1) * 320);
    }
    // Hold all five lit, then lights out.
    schedule(() => setPhase("out"), 350 + COLUMNS * 320 + 700);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      document.body.style.overflow = "";
    };
  }, []);

  function finish() {
    document.body.style.overflow = "";
    setPhase("done");
  }

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="lights-out"
          className="fixed inset-0 z-[100] overflow-hidden bg-[#070610]"
          initial={{ y: 0 }}
          animate={phase === "out" ? { y: "-100%" } : { y: 0 }}
          transition={
            phase === "out"
              ? { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
              : { duration: 0 }
          }
          onAnimationComplete={() => {
            if (phase === "out") finish();
          }}
        >
          {/* Hyperspeed warp backdrop */}
          {warp && (
            <div className="absolute inset-0">
              <Hyperspeed effectOptions={LIVERY_HYPERSPEED} />
            </div>
          )}
          {/* Darken the warp a touch so the red lights read clearly */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Gantry + status, over the warp */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="flex items-end gap-3 sm:gap-5">
              {Array.from({ length: COLUMNS }).map((_, col) => {
                const on = phase === "run" && col < lit;
                return (
                  <div
                    key={col}
                    className="flex flex-col gap-2 rounded-lg border border-white/10 bg-black/70 p-2 backdrop-blur-sm"
                  >
                    {[0, 1].map((row) => (
                      <span
                        key={row}
                        className="h-7 w-7 rounded-full sm:h-9 sm:w-9"
                        style={{
                          background: on ? "#ff2233" : "#2a0a0e",
                          boxShadow: on
                            ? "0 0 18px 4px rgba(255,40,55,0.75), inset 0 0 6px rgba(255,255,255,0.4)"
                            : "inset 0 0 6px rgba(0,0,0,0.8)",
                          transition:
                            "background 90ms linear, box-shadow 90ms linear",
                        }}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
            <p className="mt-8 font-code text-xs uppercase tracking-[0.4em] text-white/60 sm:text-sm">
              {phase === "out" ? "Lights out — away we go" : "Formation lap"}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LightsOutLoader;
