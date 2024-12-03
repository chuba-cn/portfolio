/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Twitter from "../../public/svgs/twitter.svg";
import Github from "../../public/svgs/logo-github.svg";
import LinkedIn from "../../public/svgs/linkedin.svg";


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


