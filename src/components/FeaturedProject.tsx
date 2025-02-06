"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { GithubIcon } from "./Icons";
import { motion } from "framer-motion";

type FeaturedProjectProps = {
  type: string;
  title: string;
  summary: string;
  img: string | StaticImageData;
  link: string;
  github: string;
};

const FeaturedProject = ({
  type,
  title,
  summary,
  img,
  link,
  github,
}: FeaturedProjectProps) => {
  return (
    <article className="w-full relative flex items-center justify-between rounded-br-2xl rounded-3xl border border-solid border-dark bg-light dark:bg-dark dark:border-light shadow-2xl p-12">
      <div
        className={
          "absolute top-0 -right-3 -z-10 w-[101%] h-[103%] bg-dark dark:bg-light rounded-[2.5rem] rounded-br-3xl"
        }
      />
      <Link
        href={link}
        target="_blank"
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg border border-solid border-dark dark:border-light"
      >
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Image
            src={img}
            alt={title}
            className="w-full h-auto"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </Link>

      <div className="w-1/2 flex flex-col items-start justify-between pl-6">
        <span className="text-purple-400 dark:text-primaryDark font-medium text-xl">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light">
            {title}
          </h2>
        </Link>
        <p className="my-2 font-normal text-dark dark:text-light">{summary}</p>
        <div className="mt-2 flex items-center">
          <Link href={github} target="_blank" className="w-10">
            {" "}
            <GithubIcon />{" "}
          </Link>
          <Link
            href={link}
            target="_blank"
            className="ml-4 rounded-lg text-light p-2 px-6 text-lg font-semibold bg-dark dark:bg-light dark:text-dark"
          >
            Visit Project
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FeaturedProject;
