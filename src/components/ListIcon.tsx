'use client';

import {motion, useScroll, useSpring} from "motion/react";
import React, { RefObject } from "react";

const ListIcon = ({ reference }: { reference: RefObject<HTMLLIElement>}) => {

    const { scrollYProgress } = useScroll({
        target:  reference,
        offset: ["center end", "center center"]
    });
    const springYProgress = useSpring(scrollYProgress);

    return(
        <figure className={"absolute left-0 stroke-dark dark:stroke-light"}>
            <svg className={"-rotate-90"} width={"75"} height={"75"} viewBox={"0 0 100 100"}>
                <motion.circle cx={"75"} cy={"75"} r={"20"} className={"stroke-purple-400 dark:stroke-primaryDark stroke-1 fill-none"}/>
                <motion.circle
                    cx={"75"} cy={"75"} r={"20"} className={"stroke-[5px] fill-light dark:fill-dark"}
                    style={{
                        pathLength: springYProgress
                    }}
                />
                <motion.circle cx={"75"} cy={"75"} r={"10"} className={"animate-pulse stroke-1 fill-purple-400 dark:fill-primaryDark"}/>
            </svg>
        </figure>
    )
}

export default ListIcon