/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Twitter from "../../public/svgs/twitter.svg";
import Github from "../../public/svgs/logo-github.svg";
import LinkedIn from "../../public/svgs/linkedin.svg";
import CircularTextInfo from "../../public/svgs/CircularSkills2.svg";
import LightBulbIcon from "../../public/svgs/miscellaneous_icons_1.svg";
import HeroSVG from "../../public/images/profile/Banner(1).svg";
import Sun from "../../public/svgs/sunny-filled-loop-to-moon-filled-loop-transition.svg"
import Moon from "../../public/svgs/moon-filled-to-sunny-filled-loop-transition.svg";

export const SunIcon = ({
  className,
  ...rest
}: {
  className?: string;
  [key: string]: any;
}) => {
  return <Sun className={`w-full h-auto ${className}`} {...rest} />;
};

export const MoonIcon = ({
  className,
  ...rest
}: {
  className?: string;
  [key: string]: any;
}) => {
  return <Moon className={`w-full h-auto ${className}`} {...rest} />;
};

export const TwitterIcon = ({className, ...rest}: {className?: string, [key: string]: any}) => {
  return (
    <Twitter className={`w-full h-auto ${className}` } {...rest}/>
  )
}

export const GithubIcon = ({
  className,
  ...rest
}: {
  className?: string;
  [key: string]: any;
}) => {
  return <Github className={`w-full h-auto ${className}`} {...rest} />;
};


export const LinkedInIcon = ({
  className,
  ...rest
}: {
  className?: string;
  [key: string]: any;
}) => {
  return <LinkedIn className={`w-full h-auto ${className}`} {...rest} />;
};

export const CircularText = ({
  className,
  ...rest
}: {
  className?: string;
  [key: string]: any;
}) => {
  return <CircularTextInfo className={`w-full h-auto ${className}`} {...rest} />;
};

export const LightBulb = ({
  className,
  ...rest
}: {
  className?: string;
  [key: string]: any;
}) => {
  return <LightBulbIcon className={`w-full h-auto ${className}`} {...rest} />;
};

export const HeroBanner = ({
  className,
  ...rest
}: {
    className?: string;
  [key: string]: any;
  }) => {
  return <HeroSVG className={`w-full h-auto ${className}`} {...rest} />
}
