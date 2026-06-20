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
import { activeStop, STOP_TS } from "@/components/racing/track/lapConfig";
import ElectricBorder from "@/components/racing/ElectricBorder";
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
  // Card sits on the same side as the roadside marker (even = right, odd = left).
  const onRight = index % 2 === 0;
  const fromX = onRight ? 60 : -60;
  return (
    <motion.div
      initial={{ opacity: 0, x: fromX, filter: "blur(6px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -fromX, filter: "blur(6px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-auto absolute top-[42%] w-[min(92vw,30rem)] -translate-y-1/2 ${
        onRight ? "right-4 md:right-[6vw]" : "left-4 md:left-[6vw]"
      }`}
    >
      <ElectricBorder color="#AC6AFF" speed={1} chaos={0.1} borderRadius={24}>
        <div className="cursor-target rounded-3xl bg-bg/80 p-7 backdrop-blur-md md:p-8">
          <div className="flex items-center gap-3 font-code text-[0.65rem] uppercase tracking-[0.2em]">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-color-1 font-bold text-white">
              {index + 1}
            </span>
            <span className="text-color-1">
              Stop {String(index + 1).padStart(2, "0")} /{" "}
              {String(STOP_TS.length).padStart(2, "0")}
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
            className="relative mt-4 max-h-[26vh] overflow-hidden"
            style={{
              maskImage: "linear-gradient(180deg, #000 76%, transparent)",
              WebkitMaskImage: "linear-gradient(180deg, #000 76%, transparent)",
            }}
          >
            <p className="text-text-muted body-2">{job.description}</p>
          </div>
        </div>
      </ElectricBorder>
    </motion.div>
  );
};

const DriveExperience = () => {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(-1);
  // Only mount the WebGL scene while the section is near the viewport, so it
  // never runs alongside the page-wide car (one GPU context at a time).
  const [near, setNear] = useState(false);
  const [mountScene, setMountScene] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
    const a = activeStop(v);
    setActive((prev) => (prev !== a ? a : prev));
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "40% 0px 40% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Sequence the handoff so the page car and this scene never run at once:
  // entering, hide the car first then mount the drive a beat later; leaving,
  // unmount the drive first then bring the car back.
  useEffect(() => {
    if (near) {
      window.dispatchEvent(new CustomEvent("exp-scene", { detail: true }));
      const t = setTimeout(() => setMountScene(true), 220);
      return () => clearTimeout(t);
    }
    setMountScene(false);
    const t = setTimeout(
      () => window.dispatchEvent(new CustomEvent("exp-scene", { detail: false })),
      220
    );
    return () => clearTimeout(t);
  }, [near]);

  return (
    <section ref={ref} id="experience" className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#08070f]">
        {mountScene && <TrackScene progress={progress} />}

        {/* Heading */}
        <div className="pointer-events-none absolute left-[6vw] top-[18vh] max-w-md">
          <p className="mb-3 font-code text-[0.6rem] uppercase tracking-[0.3em] text-color-1">
            [ Experience ]
          </p>
          <h2 className="h2 text-text [text-shadow:0_2px_28px_rgba(0,0,0,0.7)]">
            The lap so far.
          </h2>
          <p className="mt-3 font-code text-xs uppercase tracking-wider text-text-muted">
            Scroll to drive the street — a stop for each role.
          </p>
        </div>

        {/* Role reveal */}
        <AnimatePresence mode="wait">
          {active >= 0 && <RoleCard key={active} index={active} />}
        </AnimatePresence>

        {/* Corner ticker */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
          {STOP_TS.map((_, i) => (
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
