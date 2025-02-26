/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface HyperTextProps {
  text: string;
  duration?: number;
  framerProps?: Variants;
  className?: string;
  animateOnLoad?: boolean;
  shouldCenter?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export default function HyperText({
  text,
  duration = 2000,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  className,
  animateOnLoad = true,
  shouldCenter = false,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(() => {
    // Group the text into words
    return text.split(" ").map((word) => word.split(""));
  });

  const [trigger, setTrigger] = useState(false);
  const interations = useRef(0);
  const isFirstRender = useRef(true);

  const triggerAnimation = () => {
    interations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (!animateOnLoad && isFirstRender.current) {
          clearInterval(interval);
          isFirstRender.current = false;
          return;
        }
        if (interations.current < text.length) {
          setDisplayText((words) =>
            words.map((word) =>
              word.map((l, i) =>
                i <= interations.current
                  ? text.split(" ")[words.indexOf(word)][i]
                  : alphabets[getRandomInt(26)]
              )
            )
          );
          interations.current = interations.current + 0.1;
        } else {
          setTrigger(false);
          clearInterval(interval);
        }
      },
      duration / (text.length * 10)
    );
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [text, duration, trigger, animateOnLoad]);

  return (
    <div
      className={`flex flex-wrap scale-100 cursor-default overflow-visible py-2 ${shouldCenter ? 'items-center justify-center' : ''}`}
      // onMouseEnter={triggerAnimation}
    >
      <AnimatePresence mode="sync">
        {displayText.map((word, wordIndex) => (
          <motion.div
            key={`word-${wordIndex}`}
            className="inline-flex whitespace-nowrap"
          >
            {word.map((letter, letterIndex) => (
              <motion.span
                key={`${wordIndex}-${letterIndex}`}
                className={cn(
                  "whitespace-pre",
                  className
                )}
                {...framerProps}
              >
                {letter.toUpperCase()}
              </motion.span>
            ))}
            {/* Add space after each word except the last one */}
            {wordIndex < displayText.length - 1 && (
              <motion.span
                className={cn(
                  "whitespace-pre mr-[0.25em]",
                  className
                )}
                {...framerProps}
              >
                {"\u00A0"}
              </motion.span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
