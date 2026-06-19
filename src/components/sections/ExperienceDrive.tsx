"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "motion/react";
import { experience } from "@/app/constants";
import { activeCorner, CORNER_NAMES } from "@/components/racing/track/lapConfig";
import ExperienceSection from "./ExperienceSection";

const TrackScene = dynamic(
  () => import("@/components/racing/track/TrackScene"),
  { ssr: false }
);

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

const RoleCard = ({ index }: { index: number }) => {
  const job = experience[index];
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, filter: "blur(6px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -40, filter: "blur(6px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto absolute right-4 top-1/2 w-[min(92vw,30rem)] -translate-y-1/2 rounded-3xl border border-stroke bg-bg/70 p-7 backdrop-blur-md md:right-[6vw] md:p-8"
    >
      <div className="flex items-center gap-3 font-code text-[0.65rem] uppercase tracking-[0.2em]">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-color-1 font-bold text-white">
          {index + 1}
        </span>
        <span className="text-color-1">
          Turn {index + 1} · {CORNER_NAMES[index]}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-text sm:text-2xl">
        {job.position}{" "}
        <Link
          href={job.companyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-color-1 hover:underline"
        >
          @{job.company}
        </Link>
      </h3>
      <span className="mt-1 block font-code text-xs uppercase tracking-wider text-text-muted">
        {job.time} · {job.address}
      </span>
      <div
        className="relative mt-4 max-h-[34vh] overflow-hidden"
        style={{
          maskImage: "linear-gradient(180deg, #000 78%, transparent)",
          WebkitMaskImage: "linear-gradient(180deg, #000 78%, transparent)",
        }}
      >
        <p className="text-text-muted body-2">{job.description}</p>
      </div>
    </motion.div>
  );
};

const DriveExperience = () => {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
    const a = activeCorner(v);
    setActive((prev) => (prev !== a ? a : prev));
  });

  return (
    <section ref={ref} id="experience" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <TrackScene progress={progress} />

        {/* Heading */}
        <div className="pointer-events-none absolute left-[6vw] top-[18vh] max-w-md">
          <p className="mb-3 font-code text-[0.6rem] uppercase tracking-[0.3em] text-color-1">
            [ Experience ]
          </p>
          <h2 className="h2 text-text [text-shadow:0_2px_28px_rgba(0,0,0,0.7)]">
            The lap so far.
          </h2>
          <p className="mt-3 font-code text-xs uppercase tracking-wider text-text-muted">
            Scroll to run the lap — a corner for each role.
          </p>
        </div>

        {/* Role reveal */}
        <AnimatePresence mode="wait">
          {active >= 0 && <RoleCard key={active} index={active} />}
        </AnimatePresence>

        {/* Corner ticker */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
          {CORNER_NAMES.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: active === i ? 28 : 10,
                background: i <= active ? "#AC6AFF" : "rgb(var(--stroke))",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Experience as a driven lap of Spa on capable dark desktops; the 2D circuit
 * timeline (ExperienceSection) everywhere else. Decided on mount.
 */
const ExperienceDrive = () => {
  const [drive, setDrive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const dark = document.documentElement.classList.contains("dark");
    setDrive(!reduced && wide && dark && hasWebGL());
  }, []);

  return drive ? <DriveExperience /> : <ExperienceSection />;
};

export default ExperienceDrive;
