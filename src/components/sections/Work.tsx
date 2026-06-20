"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "motion/react";
import { Github, ArrowUpRight } from "lucide-react";
import Section from "@/components/design/Section";
import Heading from "@/components/design/Heading";
import { projects, type Project } from "@/app/constants";

import veloraImg from "../../../public/images/projects/velora-1.png";
import callifyImg from "../../../public/images/projects/callify-1.png";
import devlinksImg from "../../../public/images/projects/devlinks-1.png";
import NoThrowCover from "../../../public/images/projects/nothrow-cover.svg";

const images: Record<string, StaticImageData> = {
  velora: veloraImg,
  callify: callifyImg,
  devlinks: devlinksImg,
};

const Cover = ({ project }: { project: Project }) => {
  if (project.cover === "nothrow") {
    return <NoThrowCover className="h-full w-full" />;
  }
  if (project.image && images[project.image]) {
    return (
      <Image
        src={images[project.image]}
        alt={project.title}
        className="h-full w-full object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    );
  }
  return null;
};

const Tags = ({ tags }: { tags: string[] }) => (
  <ul className="flex flex-wrap gap-2">
    {tags.map((t) => (
      <li
        key={t}
        className="rounded-lg border border-stroke bg-bg/40 px-2.5 py-1 font-code text-[0.7rem] uppercase tracking-wide text-text-muted"
      >
        {t}
      </li>
    ))}
  </ul>
);

const Actions = ({ project }: { project: Project }) => (
  <div className="mt-6 flex items-center gap-4">
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-code text-xs font-bold uppercase tracking-wider text-text transition-colors hover:text-color-1"
    >
      {project.linkLabel} <ArrowUpRight className="h-4 w-4" />
    </a>
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} on GitHub`}
      className="text-text-muted transition-colors hover:text-color-1"
    >
      <Github className="h-5 w-5" />
    </a>
  </div>
);

const FeaturedCard = ({ project }: { project: Project }) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5 }}
    className="cursor-target group grid grid-cols-1 overflow-hidden rounded-3xl border border-stroke bg-surface/60 backdrop-blur-sm transition-colors hover:border-color-1/50 lg:grid-cols-2"
  >
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block aspect-[16/10] overflow-hidden border-b border-stroke lg:border-b-0 lg:border-r"
    >
      <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
        <Cover project={project} />
      </div>
    </a>
    <div className="flex flex-col justify-center p-8 lg:p-10">
      <span className="font-code text-xs font-bold uppercase tracking-wider text-color-1">
        {project.type}
      </span>
      <h3 className="mt-3 text-2xl font-bold text-text md:text-3xl">
        {project.title}
      </h3>
      <p className="mt-4 text-text-muted body-2">{project.summary}</p>
      <div className="mt-6">
        <Tags tags={project.tags} />
      </div>
      <Actions project={project} />
    </div>
  </motion.article>
);

const GridCard = ({ project }: { project: Project }) => (
  <motion.article
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5 }}
    className="cursor-target group flex flex-col overflow-hidden rounded-3xl border border-stroke bg-surface/60 backdrop-blur-sm transition-colors hover:border-color-1/50"
  >
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block aspect-[16/10] overflow-hidden border-b border-stroke"
    >
      <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
        <Cover project={project} />
      </div>
    </a>
    <div className="flex flex-1 flex-col p-7">
      <span className="font-code text-xs font-bold uppercase tracking-wider text-color-1">
        {project.type}
      </span>
      <h3 className="mt-2 text-xl font-bold text-text">{project.title}</h3>
      <p className="mt-3 flex-1 text-text-muted body-2">{project.summary}</p>
      <div className="mt-5">
        <Tags tags={project.tags} />
      </div>
      <Actions project={project} />
    </div>
  </motion.article>
);

const Work = () => {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="work" crosses>
      <div className="container">
        <Heading
          tag="Work"
          title="Selected projects."
          text="A few things I've designed, built, and shipped — from full-stack products to open-source libraries."
        />

        <div className="flex flex-col gap-6">
          {featured.map((p) => (
            <FeaturedCard key={p.id} project={p} />
          ))}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {rest.map((p) => (
              <GridCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Work;
