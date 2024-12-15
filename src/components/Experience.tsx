'use client';

import Link from "next/link";
import { experience } from "@/app/constants";
import {useScroll, motion, useSpring} from "motion/react";
import { useRef } from "react";
import ListIcon from "@/components/ListIcon";

type DetailsProps = {
    position: string,
    company: string,
    companyLink: string,
    time: string,
    address: string,
    description: string
}

const Details = ({position, company, companyLink, time, address, description}: DetailsProps) => {
    const ref = useRef<HTMLLIElement | null>(null);

    return(
        <li ref={ref} className={"my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between"}>
            <ListIcon reference={ref}/>
            <motion.div
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1.0, type: "spring" }}
            >
                <h3 className={"capitalize font-bold text-2xl"}>{position}&nbsp; <Link target={"_blank"} className={"text-purple-400 capitalize"} href={companyLink}>@{company}</Link></h3>
                <span className={"font-medium text-dark/75 capitalize"}>{time} | {address}</span>
                <p className={"font-medium w-full"}>{description}</p>
            </motion.div>
        </li>
    )
}

const Experience = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center start"]
    });

    const springYProgress = useSpring(scrollYProgress);

    return (
        <div className={"mt-64"}>
            <h2 className={"font-bold text-6xl mb-32 w-full text-center font-geistMono"}>Experience</h2>

            <div ref={ref} className={"w-[75%] mx-auto relative"} >
                <motion.div
                    className={"absolute left-[3.4375rem] top-0 w-1 h-full bg-dark origin-top"}
                    style={{ scaleY: springYProgress }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                />
                <ul className={"w-full flex flex-col items-start justify-between ml-4"}>
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
    )
}

export default Experience