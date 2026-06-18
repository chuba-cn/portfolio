"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import profilePic from "../../public/images/profile/profile-pic.png";
import Button from "@/components/design/Button";
import TagLine from "@/components/design/TagLine";
import HeroVisual from "@/components/racing/car/HeroVisual";

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="container relative z-2 grid grid-cols-1 items-center gap-12 py-16 md:py-20 lg:grid-cols-12 lg:gap-8 lg:py-28">
        {/* Copy */}
        <div className="lg:col-span-7">
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
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button href="#work" solid>
              View my work
            </Button>
            <Button href="/Chuba-Resume.pdf" download>
              Résumé
            </Button>
          </motion.div>

          <div className="mt-10 flex items-center gap-3 text-text-muted">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-color-4 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-color-4" />
            </span>
            <span className="font-code text-xs uppercase tracking-wider">
              Currently — Lead Frontend Engineer @ TheTravelHunters
            </span>
          </div>
        </div>

        {/* Framed portrait */}
        <div className="lg:col-span-5">
          <HeroVisual
            fallback={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative mx-auto w-full max-w-sm"
              >
            {/* Rotating conic glow */}
            <div className="absolute -inset-4 z-0 opacity-60 blur-2xl dark:opacity-80">
              <div className="h-full w-full animate-spin-slow rounded-full bg-conic-gradient" />
            </div>

            {/* Angled frame */}
            <div className="relative z-1 rounded-3xl border border-stroke bg-surface/60 p-2 backdrop-blur-sm">
              <div className="overflow-hidden rounded-2xl border border-stroke">
                <Image
                  src={profilePic}
                  alt="Chuba"
                  priority
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 80vw, 33vw"
                />
              </div>

              {/* Corner accents */}
              <span className="absolute -left-px -top-px h-5 w-5 rounded-tl-3xl border-l-2 border-t-2 border-color-1" />
              <span className="absolute -right-px -bottom-px h-5 w-5 rounded-br-3xl border-b-2 border-r-2 border-color-1" />

              {/* Floating stat chip */}
              <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-xl border border-stroke bg-surface px-4 py-3 shadow-xl">
                <ArrowUpRight className="h-5 w-5 text-color-4" />
                <div>
                  <p className="font-code text-sm font-bold text-text">2+ yrs</p>
                  <p className="font-code text-[0.625rem] uppercase tracking-wider text-text-muted">
                    Shipping products
                  </p>
                </div>
              </div>
            </div>
              </motion.div>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
