"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { LIVERY_HYPERSPEED } from "./hyperspeedOptions";
import { carYield } from "./carYield";

// Heavy WebGL effect — its own chunk, loaded during the light sequence so it's
// ready by the time we warp. Disposes itself on unmount (forceContextLoss).
const Hyperspeed = dynamic(() => import("./Hyperspeed"), { ssr: false });

/**
 * "Lights out and away we go." — F1 start lights, then a hyperspeed launch into
 * the site. Five columns illuminate, cut, and on capable dark desktops the
 * screen warps through Hyperspeed for a beat before revealing the hero; smaller
 * / less-capable screens just slide the gantry away.
 *
 * Once per session. Skipped for reduced-motion. The loader plays before any
 * other 3D scene mounts, so only one WebGL context is ever live.
 */
const COLUMNS = 5;
const STORAGE_KEY = "lights-out-seen";
const WARP_MS = 1900;

type Phase = "run" | "warp" | "out" | "done";

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
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || sessionStorage.getItem(STORAGE_KEY)) {
      setPhase("done");
      return;
    }

    const canWarp = window.matchMedia("(min-width: 768px)").matches && hasWebGL();
    // Hold the WebGL context for the intro so the hero car doesn't run alongside
    // the warp (released in finish()).
    carYield.set("loader", true);
    document.body.style.overflow = "hidden";
    const schedule = (fn: () => void, ms: number) =>
      timers.current.push(setTimeout(fn, ms));

    for (let i = 1; i <= COLUMNS; i++) {
      schedule(() => setLit(i), 200 + (i - 1) * 300);
    }
    const lightsDone = 200 + COLUMNS * 300 + 320;

    if (canWarp) {
      schedule(() => setPhase("warp"), lightsDone);
      schedule(finish, lightsDone + WARP_MS);
    } else {
      schedule(() => setPhase("out"), lightsDone);
    }

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      document.body.style.overflow = "";
      carYield.set("loader", false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    sessionStorage.setItem(STORAGE_KEY, "1");
    document.body.style.overflow = "";
    carYield.set("loader", false);
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
          exit={{ opacity: 0 }}
          transition={
            phase === "out"
              ? { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
              : { duration: 0.6, ease: "easeInOut" }
          }
          onAnimationComplete={() => {
            if (phase === "out") finish();
          }}
        >
          {/* Hyperspeed warp */}
          {phase === "warp" && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Hyperspeed effectOptions={LIVERY_HYPERSPEED} />
            </motion.div>
          )}

          {/* Gantry + status (lights phase) */}
          {phase !== "warp" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
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
              <p className="mt-8 font-code text-xs uppercase tracking-[0.4em] text-white/50 sm:text-sm">
                {phase === "out" ? "Lights out" : "Formation lap"}
              </p>
            </div>
          )}

          {/* Warp caption */}
          {phase === "warp" && (
            <motion.p
              className="pointer-events-none absolute inset-x-0 bottom-[12vh] text-center font-code text-sm uppercase tracking-[0.5em] text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: WARP_MS / 1000, times: [0, 0.15, 0.7, 1] }}
            >
              Lights out — away we go
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LightsOutLoader;
