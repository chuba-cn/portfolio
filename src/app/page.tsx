"use client";

import LayoutPage from "@/components/LayoutPage";
import Image from "next/image";
// import { useMediaQuery } from "@/hooks/useMediaQuery";
import AnimatedHeroText from "@/components/AnimatedHeroText";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import HireMe from "@/components/HireMe";
import { LightBulb } from "@/components/Icons";
import TrueFocus from "@/components/TrueFocus";
import BlurText from "@/components/BlurText";

export default function HomePage() {
  // const isLargeScreen = useMediaQuery("(min-width: 640px)");

  return (
    <div>
      <main className="flex items-center text-dark w-full min-h-screen dark:text-light">
        <LayoutPage className="pt-0">
          <div className="flex items-center justify-between w-full bg-transparent">
            <div className="w-1/2 flex flex-col items-center self-center">
              <div className="w-[90%] flex flex-col gap-3 items-center self-start">
                <div className="flex items-center self-start">
                  <TrueFocus
                    borderColor="#C084FC"
                    sentence="Hi, I'm Chuba👋"
                    animationDuration={0.2}
                  />
                </div>
                <AnimatedHeroText
                  text="Solving Real-World Problems Through Innovative Web Solutions."
                  className="text-left text-6xl"
                />

                <BlurText
                  text="I bring designs to life with code, creating sleek and
                  user-friendly web interfaces. Explore my work and see the
                  possibilities."
                  delay={50}
                  animateBy="words"
                  className="font-geistSans mb-4 font-light text-xl"
                />

                <div className="flex items-center self-start mt-2">
                  <Link
                    href={"/Chuba-Resume.pdf"}
                    target="_blank"
                    className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light"
                    download
                  >
                    Resume{" "}
                    <span>
                      <ExternalLink className="ml-1" />
                    </span>{" "}
                  </Link>
                  <Link
                    href="mailto:chinemelumchubanwene57@gmail.com"
                    target="_blank"
                    className="ml-4 text-lg font-medium capitalize text-dark underline dark:text-light underline-offset-4"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-1/2">
              <div className="">
                <Image
                  src="/images/profile/Banner(1).svg"
                  alt="Hero Picture of Chuba"
                  className="w-full h-auto rounded-3xl"
                  width={500}
                  height={300}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                />
              </div>
            </div>
          </div>
        </LayoutPage>

        <HireMe />
        <div className="w-12 fixed left-4 bottom-4 flex items-center justify-center overflow-hidden">
          <LightBulb className="w-full h-auto" />
        </div>
      </main>
    </div>
  );
}
