import AboutContent from "@/components/AboutContent";
import AnimatedHeroText from "@/components/AnimatedHeroText";
import LayoutPage from "@/components/LayoutPage";
import { Metadata } from "next";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import TransitionEffect from "@/components/TransitionEffect";

export const metadata: Metadata = {
  title: "Chuba | About",
  description: "Learn more about me and my skills.",
};

const page = () => {
  return (
    <div>
      <TransitionEffect />
      <main className="flex w-full flex-col items-center justify-center dark:text-light">
        <LayoutPage className="pt-16">
          <AnimatedHeroText
            text="Passion Fuels Purpose!"
            shouldCenter
            className="text-7xl mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
          />
          <AboutContent />
          <Skills />
          <Experience />
        </LayoutPage>
      </main>
    </div>
  );
};

export default page;
