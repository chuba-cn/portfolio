"use client";

import React from "react";
import Logo from "./Logo";
import { TwitterIcon, GithubIcon, LinkedInIcon } from "./Icons";
import { motion } from "motion/react";
import { useThemeSwitcher, Mode } from "@/hooks/useThemeSwitcher";
import { MoonIcon, SunIcon } from "lucide-react";
import MenuButton from "./MenuButton";
import CustomLink from "./CustomLink";
import CustomMobileLink from "./CustomMobileLink";

const Navbar = () => {
  const [mode, setMode] = useThemeSwitcher() as [
    Mode,
    React.Dispatch<React.SetStateAction<Mode>>
  ];

  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const [menuIsOpen, setMenuIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMenuClick = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  if (!isMounted) return null;

  return (
    <header className="w-full px-32 py-8 font-medium flex items-center justify-between dark:text-light relative z-10 lg:px-16 md:px-12 sm:px-8">
      <MenuButton menuIsOpen={menuIsOpen} handleMenuClick={handleMenuClick} />

      <div className="w-full flex justify-between items-center lg:hidden">
        <nav>
          <CustomLink href="/" title="Home" className="mr-4" />
          <CustomLink href="/about" title="About" className="mx-4" />
          <CustomLink href="/projects" title="Projects" className="ml-4" />
        </nav>

        <nav className=" flex items-center justify-center flex-wrap">
          <motion.a
            href="https://x.com/c__chuba"
            target="_blank"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mx-3"
          >
            <TwitterIcon />
          </motion.a>
          <motion.a
            href="https://github.com/chuba-cn"
            target="_blank"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mx-3"
          >
            <GithubIcon />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/chinemelum-chuba-nwene-bb4098175"
            target="_blank"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 ml-3"
          >
            <LinkedInIcon />
          </motion.a>

          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className={`ml-4 flex items-center justify-center rounded-full p-1
              ${mode === "light" ? " text-dark" : " text-light"}
            `}
          >
            {mode === "dark" ? (
              <SunIcon className="fill-dark" />
            ) : (
              <MoonIcon className="fill-dark" />
            )}
          </button>
        </nav>
      </div>

      {menuIsOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
          animate={{ scale: 1, opacity: 1 }}
          className="min-w-[70vw] flex flex-col justify-between items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32"
        >
          <nav className="flex flex-col items-center justify-center">
            <CustomMobileLink
              href="/"
              title="Home"
              className=""
              toggleMenuVisibility={handleMenuClick}
            />
            <CustomMobileLink
              href="/about"
              title="About"
              className=""
              toggleMenuVisibility={handleMenuClick}
            />
            <CustomMobileLink
              href="/projects"
              title="Projects"
              className=""
              toggleMenuVisibility={handleMenuClick}
            />
          </nav>

          <nav className=" flex items-center justify-center flex-wrap mt-2">
            <motion.a
              href="https://x.com/c__chuba"
              target="_blank"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 sm:mx-1"
            >
              <TwitterIcon />
            </motion.a>
            <motion.a
              href="https://github.com/chuba-cn"
              target="_blank"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 sm:mx-1 bg-light rounded-full dark:bg-dark"
            >
              <GithubIcon />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/chinemelum-chuba-nwene-bb4098175"
              target="_blank"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 ml-3 sm:mx-1"
            >
              <LinkedInIcon />
            </motion.a>

            <button
              onClick={() => {
                setMode(mode === "light" ? "dark" : "light");
              }}
              className={`ml-4 flex items-center justify-center rounded-full p-1
              ${mode === "light" ? " text-dark" : " text-light"}
            `}
            >
              {mode === "dark" ? (
                <SunIcon className="fill-dark" />
              ) : (
                <MoonIcon className="fill-dark" />
              )}
            </button>
          </nav>
        </motion.div>
      )}

      <div className="absolute left-[50%] top-2 translate-x-[-50%]">
        <Logo />
      </div>
    </header>
  );
};

export default Navbar;
