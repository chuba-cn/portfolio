"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * "Lights out and away we go." — an F1 start-light gantry as the page loader.
 * Five columns illuminate in sequence, hold, then all cut to black (lights out)
 * and the overlay lifts to reveal the site.
 *
 * Plays on every page load / hard reload. Skipped only for reduced-motion.
 * Content renders beneath it (a visual overlay, not a gate), so LCP/SEO are
 * unaffected. CSS only — no WebGL.
 */
const COLUMNS = 5;

type Phase = "run" | "out" | "done";

const LightsOutLoader = () => {
  const [phase, setPhase] = useState<Phase>("run");
  const [lit, setLit] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setPhase("done");
      return;
    }

    document.body.style.overflow = "hidden";
    const schedule = (fn: () => void, ms: number) =>
      timers.current.push(setTimeout(fn, ms));

    // Light each column in turn.
    for (let i = 1; i <= COLUMNS; i++) {
      schedule(() => setLit(i), 250 + (i - 1) * 320);
    }
    // Hold all five lit, then lights out.
    schedule(() => setPhase("out"), 250 + COLUMNS * 320 + 650);

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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#070610]"
          initial={{ y: 0 }}
          animate={phase === "out" ? { y: "-100%" } : { y: 0 }}
          transition={
            phase === "out"
              ? { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.25 }
              : { duration: 0 }
          }
          onAnimationComplete={() => {
            if (phase === "out") finish();
          }}
        >
          {/* Gantry */}
          <div className="flex items-end gap-3 sm:gap-5">
            {Array.from({ length: COLUMNS }).map((_, col) => {
              const on = phase === "run" && col < lit;
              return (
                <div
                  key={col}
                  className="flex flex-col gap-2 rounded-lg border border-white/10 bg-black/60 p-2"
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

          {/* Status line */}
          <p className="mt-8 font-code text-xs uppercase tracking-[0.4em] text-white/50 sm:text-sm">
            {phase === "out" ? "Lights out — away we go" : "Formation lap"}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LightsOutLoader;
