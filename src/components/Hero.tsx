"use client";

import { motion } from "motion/react";
import Button from "@/components/design/Button";
import Magnetic from "@/components/design/Magnetic";
import TagLine from "@/components/design/TagLine";
import HudCounter from "@/components/racing/HudCounter";

// Real impact metrics, framed as live race telemetry.
const TELEMETRY = [
  { target: 62, decimals: 0, prefix: "−", suffix: "%", label: "Manual calls" },
  { target: 1.2, decimals: 1, prefix: "", suffix: "M+", label: "Revenue unlocked" },
  { target: 200, decimals: 0, prefix: "<", suffix: "ms", label: "Real-time delivery" },
  { target: 99.9, decimals: 1, prefix: "", suffix: "%", label: "Uptime at peak" },
];

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[88vh] items-center overflow-hidden"
    >
      {/* The persistent car (RaceScene) lives behind the whole page; the hero
          just provides scrims so the copy stays legible over it. */}

      {/* Legibility scrims */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-bg via-bg/75 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-bg to-transparent"
      />

      {/* Overlaid content */}
      <div className="container pointer-events-none relative z-10 py-20">
        <TagLine className="mb-5">Frontend / Full-stack Engineer</TagLine>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h1 max-w-2xl text-text"
        >
          I engineer{" "}
          <span className="text-color-1">fast, scalable interfaces</span> for
          real-world products.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="body-1 mt-6 max-w-xl text-text-muted"
        >
          I&apos;m Chuba — a frontend-focused engineer building performant,
          real-time web applications. Currently leading frontend at
          TheTravelHunters and going deep on systems programming with Rust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Button href="#work" solid>
              View my work
            </Button>
          </Magnetic>
          <Magnetic>
            <Button href="/Chuba-Resume.pdf" download>
              Résumé
            </Button>
          </Magnetic>
        </motion.div>

        {/* Live telemetry readout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-12"
        >
          <div className="mb-3 flex items-center gap-2 font-code text-[0.6rem] uppercase tracking-[0.3em] text-text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-color-4 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-color-4" />
            </span>
            Live telemetry
          </div>
          <dl className="grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
            {TELEMETRY.map((m, i) => (
              <div key={m.label} className="border-l border-stroke pl-3">
                <dd className="font-code text-2xl font-bold text-text md:text-3xl">
                  <HudCounter
                    target={m.target}
                    decimals={m.decimals}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    delay={0.5 + i * 0.12}
                  />
                </dd>
                <dt className="mt-1 font-code text-[0.6rem] uppercase tracking-[0.2em] text-text-muted">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
