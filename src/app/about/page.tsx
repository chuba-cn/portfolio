import AboutContent from "@/components/AboutContent";
import AnimatedHeroText from "@/components/AnimatedHeroText";
import LayoutPage from "@/components/LayoutPage";
import { Metadata } from "next";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";

export const metadata: Metadata = {
  title: "Chuba | About",
  description: "Learn more about me and my skills.",
};

const page = () => {
  return (
    <main className="flex w-full flex-col items-center justify-center dark:text-light">
      <LayoutPage className="pt-16">
        <AnimatedHeroText text="Passion Fuels Purpose!" shouldCenter className="text-7xl mb-16" />
        <AboutContent />
        <Skills />
        <Experience />
      </LayoutPage>
    </main>
  )
}

export default page