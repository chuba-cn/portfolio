import React from "react";
import SectionSvg from "./SectionSvg";

type SectionProps = {
  className?: string;
  id?: string;
  crosses?: boolean;
  crossesOffset?: string;
  customPaddings?: string;
  children: React.ReactNode;
};

const Section = ({
  className,
  id,
  crosses,
  crossesOffset,
  customPaddings,
  children,
}: SectionProps) => {
  return (
    <section
      id={id}
      className={`relative ${
        customPaddings ||
        `py-10 lg:py-16 xl:py-20 ${crosses ? "lg:py-32 xl:py-40" : ""}`
      } ${className || ""}`}
    >
      {children}

      {/* Vertical side rails */}
      <div className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke pointer-events-none md:block lg:left-7.5 xl:left-10" />
      <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke pointer-events-none md:block lg:right-7.5 xl:right-10" />

      {/* HUD corner brackets (aligned to the side rails) */}
      <span className="hidden pointer-events-none absolute top-0 left-5 h-3 w-3 border-l-2 border-t-2 border-color-1/40 md:block lg:left-7.5 xl:left-10" />
      <span className="hidden pointer-events-none absolute top-0 right-5 h-3 w-3 border-r-2 border-t-2 border-color-1/40 md:block lg:right-7.5 xl:right-10" />
      <span className="hidden pointer-events-none absolute bottom-0 left-5 h-3 w-3 border-l-2 border-b-2 border-color-1/40 md:block lg:left-7.5 xl:left-10" />
      <span className="hidden pointer-events-none absolute bottom-0 right-5 h-3 w-3 border-r-2 border-b-2 border-color-1/40 md:block lg:right-7.5 xl:right-10" />

      {crosses && (
        <>
          <div
            className={`hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-stroke ${
              crossesOffset || ""
            } pointer-events-none lg:block xl:left-10 xl:right-10`}
          />
          <SectionSvg crossesOffset={crossesOffset} />
        </>
      )}
    </section>
  );
};

export default Section;
