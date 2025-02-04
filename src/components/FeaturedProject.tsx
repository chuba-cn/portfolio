import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GithubIcon } from './Icons'

type FeaturedProjectProps = {
  type: string,
  title: string,
  summary: string,
  img: string | StaticImageData,
  link: string,
  github: string
}

const FeaturedProject = ({
  type,
  title,
  summary,
  img,
  link,
  github
}: FeaturedProjectProps) => {
  return (
    <article className="w-full relative flex items-center justify-between rounded-br-2xl rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12">
      <div
        className={
          "absolute top-0 -right-3 -z-10 w-[101%] h-[103%] bg-dark rounded-[2.5rem] rounded-br-3xl"
        }
      />
      <Link
        href={link}
        target="_blank"
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg border border-solid border-dark"
      >
        <Image src={img} alt={title} className="w-full h-full" />
      </Link>

      <div className="w-1/2 flex flex-col items-start justify-between pl-6">
        <span className="text-purple-400 font-medium text-xl">{type}</span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-4xl font-bold">{title}</h2>
        </Link>
        <p className="my-2 font-normal text-dark">{summary}</p>
        <div className="mt-2 flex items-center">
          <Link href={github} target="_blank" className="w-10">
            {" "}
            <GithubIcon />{" "}
          </Link>
          <Link
            href={link}
            target="_blank"
            className="ml-4 rounded-lg text-light p-2 px-6 text-lg font-semibold bg-dark"
          >
            Visit Project
          </Link>
        </div>
      </div>
    </article>
  );
}

export default FeaturedProject