'use client';

import {motion, useScroll} from "motion/react";
import React, { RefObject } from "react";

const ListIcon = ({ reference }: { reference: RefObject<HTMLLIElement>}) => {

    const { scrollYProgress } = useScroll({
        target:  reference,
        offset: ["end end", "center center"]
    });

    console.log("scrollyProgress: ", scrollYProgress)

    return (
      <figure className={"absolute left-0 stroke-dark dark:stroke-light"}>
        <svg
          className={
            "-rotate-90 md:w-[3.75rem] md:h-[3.75rem] xs:w-[2.5rem] xs:h-[2.5rem]"
          }
          width={"75"}
          height={"75"}
          viewBox={"0 0 100 100"}
        >
          <circle
            cx={"75"}
            cy={"50"}
            r={"20"}
            className={
              "stroke-purple-400 dark:stroke-primaryDark stroke-1 fill-none"
            }
          />
          <motion.circle
            cx={"75"}
            cy={"50"}
            r={"20"}
            className={"stroke-[5px] fill-light dark:fill-dark"}
            style={{
              pathLength: scrollYProgress,
            }}
          />
          <circle
            cx={"75"}
            cy={"50"}
            r={"10"}
            className={
              "animate-pulse stroke-1 fill-purple-400 dark:fill-primaryDark"
            }
          />
        </svg>
      </figure>
    );
}

export default ListIcon