"use client"

import React from "react";
import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

interface AnimatePresenceWrapperProps {
  children: React.ReactNode;
}

const AnimatePresenceWrapper = ({ children }: AnimatePresenceWrapperProps) => {

  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" key={pathname}>
      {children}
    </AnimatePresence>
  )
};

export default AnimatePresenceWrapper;