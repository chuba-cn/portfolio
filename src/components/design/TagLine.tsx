import React from "react";
import brackets from "./Brackets";

type TagLineProps = {
  className?: string;
  children: React.ReactNode;
};

const TagLine = ({ className, children }: TagLineProps) => {
  return (
    <div className={`tagline flex items-center ${className || ""}`}>
      {brackets("left")}
      <div className="mx-3 text-text-muted">{children}</div>
      {brackets("right")}
    </div>
  );
};

export default TagLine;
