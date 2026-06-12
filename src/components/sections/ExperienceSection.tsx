"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScroll, useSpring, motion } from "motion/react";
import { experience } from "@/app/constants";
import Heading from "@/components/design/Heading";
import Section from "@/components/design/Section";

type DetailsProps = {
  position: string;
  company: string;
  companyLink: string;
  time: string;
  address: string;
  description: string;
};

const Details = ({
  position,
  company,
  companyLink,
  time,
  address,
  description,
}: DetailsProps) => {
  return (
    <li className="relative pl-10 md:pl-14">
      {/* Node */}
      <span className="absolute left-0 top-1.5 flex h-7 w-7 -translate-x-[0.7rem] items-center justify-center rounded-full border border-stroke bg-surface md:-translate-x-[0.85rem]">
        <span className="h-2.5 w-2.5 rounded-full bg-color-1" />
      </span>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-text sm:text-2xl">
          {position}{" "}
          <Link
            href={companyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-color-1 hover:underline"
          >
            @{company}
          </Link>
        </h3>
        <span className="mt-1 block font-code text-xs uppercase tracking-wider text-text-muted">
          {time} · {address}
        </span>
        <p className="mt-4 text-text-muted body-2">{description}</p>
      </motion.div>
    </li>
  );
};

const ExperienceSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section id="experience" crosses>
      <div className="container">
        <Heading tag="Experience" title="Where I've shipped." />

        <div ref={ref} className="relative mx-auto max-w-3xl">
          {/* Track */}
          <div className="absolute left-0 top-0 h-full w-0.5 bg-stroke md:left-0.5" />
          {/* Progress */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-0 top-0 h-full w-0.5 origin-top bg-color-1 md:left-0.5"
          />

          <ul className="flex flex-col gap-14">
            {experience.map((job, i) => (
              <Details key={i} {...job} />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default ExperienceSection;
