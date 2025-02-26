"use client";

import Link from "next/link";
import { experience } from "@/app/constants";
import { useScroll, motion } from "motion/react";
import { useRef } from "react";
import ListIcon from "@/components/ListIcon";

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
  const ref = useRef<HTMLLIElement | null>(null);

  return (
    <li
      ref={ref}
      className={
        "my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]"
      }
    >
      <ListIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className={"capitalize font-bold text-2xl sm:text-xl xs:text-lg"}>
          {position}&nbsp;{" "}
          <Link
            target={"_blank"}
            className={"text-purple-400 dark:text-primaryDark capitalize"}
            href={companyLink}
          >
            @{company}
          </Link>
        </h3>
        <span
          className={"font-medium text-dark/75 capitalize dark:text-light/75 xs:text-sm"}
        >
          {time} | {address}
        </span>
        <p className={"font-normal w-full md:text-sm"}>{description}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div className={"mt-32 mb-16"}>
      <h2
        className={"font-bold text-6xl mb-32 w-full text-center font-geistMono md:text-6xl xs:text-4xl md:mb-16"}
      >
        Experience
      </h2>

      <div ref={ref} className={"w-[75%] mx-auto relative lg:w-[90%] md:w-full"}>
        <motion.div
          className={
            "absolute left-9 top-0 w-[4px] h-full bg-dark dark:bg-light origin-top md:w-[0.125rem] md:left-[1.875rem] xs:left-[1.25rem]"
          }
          style={{ scaleY: scrollYProgress }}
        //   whileInView={{ y: 0 }}
        //   transition={{ duration: 0.5, type: "spring" }}
        />
        <ul className={"w-full flex flex-col items-start justify-between ml-4 xs:ml-2"}>
          {experience.map((job, index) => (
            <Details
              key={index}
              position={job.position}
              company={job.company}
              companyLink={job.companyLink}
              time={job.time}
              address={job.address}
              description={job.description}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Experience;
