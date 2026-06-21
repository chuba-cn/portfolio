"use client";

import React from "react";
import Link from "next/link";
import { MoonIcon, SunIcon } from "lucide-react";
import { navLinks } from "@/app/constants";
import { useThemeSwitcher, Mode } from "@/hooks/useThemeSwitcher";
import Button from "@/components/design/Button";

const Header = () => {
  const [mode, setMode] = useThemeSwitcher() as [
    Mode,
    React.Dispatch<React.SetStateAction<Mode>>
  ];

  const [isMounted, setIsMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => setIsMounted(true), []);

  // Lock body scroll while the mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scrollspy: highlight the section currently in view
  React.useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isMounted]);

  if (!isMounted) return null;

  const toggleTheme = () => setMode(mode === "light" ? "dark" : "light");

  const ThemeToggle = ({ className = "" }: { className?: string }) => (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={`cursor-target flex h-10 w-10 items-center justify-center rounded-full border border-stroke text-text transition-colors hover:text-color-1 ${className}`}
    >
      {mode === "dark" ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full border-b border-stroke backdrop-blur-md ${
          open ? "bg-bg" : "bg-bg/80"
        }`}
      >
        <div className="container flex h-[4.75rem] items-center lg:h-[5.25rem]">
        {/* Logo */}
        <Link
          href="#hero"
          onClick={() => setOpen(false)}
          className="cursor-target group mr-auto flex items-center gap-2.5 lg:mr-8"
        >
          {/* Race number plate */}
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-md bg-color-1 font-code text-lg font-bold italic text-white shadow-[0_0_12px_rgba(172,106,255,0.5)]">
            7
            <span className="absolute inset-x-0 bottom-0 h-1 bg-color-2" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-code text-sm font-bold uppercase tracking-wider text-text">
              Chuba
            </span>
            <span className="font-code text-[0.5rem] font-semibold uppercase tracking-[0.3em] text-text-muted transition-colors group-hover:text-color-1">
              {"// Racing"}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="mx-auto hidden lg:flex">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className={`cursor-target relative px-5 font-code text-xs font-semibold uppercase tracking-wider transition-colors hover:text-text xl:px-6 ${
                active === item.id ? "text-text" : "text-text-muted"
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="ml-auto flex items-center gap-3 lg:ml-8">
          <ThemeToggle />
          <Button
            href="/Chuba-Resume.pdf"
            download
            solid
            px="px-5"
            className="hidden sm:inline-flex"
          >
            Résumé
          </Button>

          {/* Mobile menu toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`block h-0.5 w-6 rounded bg-text transition-all duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded bg-text transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded bg-text transition-all duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>
      </header>

      {/* Mobile overlay nav */}
      <nav
        className={`fixed inset-x-0 top-[4.75rem] bottom-0 z-40 flex flex-col bg-bg transition-[opacity,transform] duration-300 lg:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="container flex flex-1 flex-col justify-center gap-2">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={item.url}
              onClick={() => setOpen(false)}
              className={`py-3 font-code text-2xl uppercase tracking-wide transition-colors hover:text-color-1 ${
                active === item.id ? "text-text" : "text-text-muted"
              }`}
            >
              {item.title}
            </a>
          ))}
          <Button
            href="/Chuba-Resume.pdf"
            download
            solid
            className="mt-6 self-start"
          >
            Download Résumé
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Header;
