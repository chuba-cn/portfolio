"use client";

import { motion } from "motion/react";

type SkillProps = {
  name: string;
  x: string;
  y: string;
};

const Skill = ({ name, x, y }: SkillProps) => {
  return (
    <motion.div
      className={
        "flex items-center justify-center rounded-full font-semibold bg-dark text-light py-3 px-6 shadow-dark cursor-pointer absolute dark:text-dark dark:bg-light lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3 xs:bg-transparent xs:dark:bg-transparent xs:text-dark xs:dark:text-light xs:font-bold"
      }
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y, transition: { duration: 1.5 } } }
      viewport={{once: true}}
    >
      {name}
    </motion.div>
  );
};

const Skills = () => {
  return (
    <div>
      <h2
        className={
          "font-bold text-6xl mt-32 mb-8 w-full text-center font-geistMono md:text-6xl md:mt-32"
        }
      >
        Skills
      </h2>
      <div
        className={
          "w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark lg:h-[80vh] sm:h-[60vh] xs:h-[50vh] lg:bg-circularLightLg lg:dark:bg-circularDarkLg md:bg-circularLightMd md:dark:bg-circularDarkMd sm:bg-circularLightSm sm:dark:bg-circularDarkSm"
        }
      >
        <motion.div
          className={
            "flex items-center justify-center rounded-full font-semibold bg-dark text-light p-8 shadow-dark cursor-pointer dark:text-dark dark:bg-light lg:p-6 md:p-4 xs:text-xs xs:p-2"
          }
          whileHover={{ scale: 1.05 }}
        >
          Web
        </motion.div>

        <Skill name={"HTML"} x={"-21vw"} y={"-2vw"} />
        <Skill name={"CSS"} x={"0vw"} y={"-8vw"} />
        <Skill name={"JavaScript"} x={"19vw"} y={"6vw"} />
        <Skill name={"React"} x={"0vw"} y={"12vw"} />
        <Skill name={"NextJS"} x={"-25vw"} y={"-15vw"} />
        <Skill name={"TypeScript"} x={"20vw"} y={"-12vw"} />
        <Skill name={"Git"} x={"35vw"} y={"-5vw"} />
        <Skill name={"NodeJS"} x={"0vw"} y={"-21vw"} />
        <Skill name={"Tailwind CSS"} x={"-20vw"} y={"18vw"} />
        <Skill name={"Figma"} x={"18vw"} y={"18vw"} />
      </div>
    </div>
  );
};

export default Skills;
