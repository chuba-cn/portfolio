import React from "react";
import ButtonSvg from "./ButtonSvg";

type ButtonProps = {
  className?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  px?: string;
  solid?: boolean;
  download?: boolean;
  target?: string;
};

const Button = ({
  className,
  href,
  onClick,
  children,
  px,
  solid,
  download,
  target,
}: ButtonProps) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors ${
    px || "px-7"
  } ${solid ? "text-white hover:text-white" : "text-text hover:text-color-1"} ${
    className || ""
  }`;
  const spanClasses = "relative z-10";

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        <span className={spanClasses}>{children}</span>
        {ButtonSvg(solid)}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(solid)}
    </button>
  );
};

export default Button;
