"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { experience } from "@/app/constants";
import Heading from "@/components/design/Heading";
import Section from "@/components/design/Section";

/**
 * Experience as a flying lap of Spa-Francorchamps. The circuit is a single SVG
 * path; as you scroll the section the racing line draws on, a car marker runs
 * the track (positioned/rotated via getPointAtLength in user units), and the
 * matching corner + role card light up.
 *
 * All SVG updates are imperative (setAttribute in viewBox units) so they stay
 * correct regardless of how the responsive SVG is scaled. Reduced-motion users
 * get the full static map with every corner marked and no moving car.
 */
const TRACK_PATH =
  "M 96 78 C 84 50 128 44 132 74 C 135 96 112 104 104 122 C 96 140 104 150 122 150 L 296 96 C 324 89 346 104 342 132 C 337 164 306 168 312 196 C 318 226 296 246 262 242 L 126 232 C 90 229 74 204 86 176 C 99 146 116 116 102 92 C 96 82 90 86 96 78 Z";

// Spa corner names, one per role (newest first → start of the lap).
const CORNERS = ["La Source", "Les Combes", "Pouhon", "Stavelot"];

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGGElement>(null);

  const [length, setLength] = useState(0);
  const [corners, setCorners] = useState<{ x: number; y: number }[]>([]);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.3,
  });

  // Measure the path once and place corner markers along it.
  useEffect(() => {
    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReduced(isReduced);

    const track = trackRef.current;
    if (!track) return;
    const total = track.getTotalLength();
    setLength(total);

    const n = experience.length;
    setCorners(
      experience.map((_, i) => {
        const pt = track.getPointAtLength(((i + 0.5) / n) * total);
        return { x: pt.x, y: pt.y };
      })
    );

    if (isReduced) {
      // Static map: full racing line, all corners, no car.
      lineRef.current?.setAttribute("stroke-dashoffset", "0");
      setActive(n - 1);
    } else {
      // Start hidden — drawn in as the section scrolls.
      lineRef.current?.setAttribute("stroke-dasharray", String(total));
      lineRef.current?.setAttribute("stroke-dashoffset", String(total));
      const start = track.getPointAtLength(0);
      carRef.current?.setAttribute(
        "transform",
        `translate(${start.x} ${start.y})`
      );
    }
  }, []);

  // Drive the racing line + car from scroll progress (imperative, no re-render).
  useMotionValueEvent(progress, "change", (v) => {
    const track = trackRef.current;
    if (!track || !length || reduced) return;

    const p = Math.min(1, Math.max(0, v));
    lineRef.current?.setAttribute(
      "stroke-dashoffset",
      String(length * (1 - p))
    );

    const d = p * length;
    const pt = track.getPointAtLength(d);
    const ahead = track.getPointAtLength(Math.min(length, d + 1));
    const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
    carRef.current?.setAttribute(
      "transform",
      `translate(${pt.x} ${pt.y}) rotate(${angle})`
    );

    setActive(Math.min(experience.length - 1, Math.floor(p * experience.length)));
  });

  return (
    <Section id="experience" crosses>
      <div className="container">
        <Heading
          tag="Experience"
          title="The lap so far."
          text="Each role is a corner — scroll to run the lap."
        />

        <div ref={containerRef} className="grid gap-10 lg:grid-cols-12">
          {/* Circuit map */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-stroke bg-surface/60 p-5 backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between font-code text-[0.6rem] uppercase tracking-[0.2em] text-text-muted">
                  <span>Circuit de Spa-Francorchamps</span>
                  <span className="text-color-1">
                    T{String(active + 1).padStart(2, "0")}
                  </span>
                </div>

                <svg viewBox="0 0 400 280" className="w-full">
                  {/* Track bed */}
                  <path
                    ref={trackRef}
                    d={TRACK_PATH}
                    fill="none"
                    stroke="rgb(var(--stroke))"
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Racing line (drawn on scroll) */}
                  <path
                    ref={lineRef}
                    d={TRACK_PATH}
                    fill="none"
                    stroke="#AC6AFF"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: "drop-shadow(0 0 4px rgba(172,106,255,0.7))" }}
                  />

                  {/* Start/finish tick */}
                  <circle cx={96} cy={78} r={4} fill="#FFC876" />

                  {/* Corner markers */}
                  {corners.map((c, i) => {
                    const on = i <= active;
                    return (
                      <g key={i}>
                        <circle
                          cx={c.x}
                          cy={c.y}
                          r={on ? 7 : 5}
                          fill={on ? "#AC6AFF" : "rgb(var(--surface))"}
                          stroke={on ? "#AC6AFF" : "rgb(var(--stroke))"}
                          strokeWidth={2}
                          style={{
                            transition: "r 0.2s ease, fill 0.2s ease",
                            filter: on
                              ? "drop-shadow(0 0 6px rgba(172,106,255,0.8))"
                              : "none",
                          }}
                        />
                        <text
                          x={c.x}
                          y={c.y + 3}
                          textAnchor="middle"
                          className="font-code"
                          fontSize={7}
                          fontWeight={700}
                          fill={on ? "#0E0C15" : "rgb(var(--text-muted))"}
                        >
                          {i + 1}
                        </text>
                      </g>
                    );
                  })}

                  {/* Car */}
                  {!reduced && (
                    <g ref={carRef}>
                      <path
                        d="M -5 -3.2 L 7 0 L -5 3.2 Z"
                        fill="#FFC876"
                        style={{
                          filter: "drop-shadow(0 0 5px rgba(255,200,118,0.9))",
                        }}
                      />
                    </g>
                  )}
                </svg>
              </div>
            </div>
          </div>

          {/* Role cards */}
          <ol className="lg:col-span-7 flex flex-col gap-6">
            {experience.map((job, i) => {
              const on = i === active;
              return (
                <li
                  key={i}
                  className={`relative rounded-2xl border p-6 backdrop-blur-sm transition-colors duration-300 md:p-7 ${
                    on
                      ? "border-color-1/60 bg-surface/80"
                      : "border-stroke bg-surface/40"
                  }`}
                >
                  <div className="flex items-center gap-3 font-code text-[0.65rem] uppercase tracking-[0.2em]">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-md font-bold ${
                        on
                          ? "bg-color-1 text-white"
                          : "bg-bg/60 text-text-muted"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={on ? "text-color-1" : "text-text-muted"}>
                      Turn {i + 1} · {CORNERS[i]}
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
                  <p className="mt-4 text-text-muted body-2">{job.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
};

export default ExperienceSection;
