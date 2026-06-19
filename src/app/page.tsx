import Hero from "@/components/Hero";
import Companies from "@/components/sections/Companies";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import ExperienceDrive from "@/components/sections/ExperienceDrive";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Companies />
      <About />
      <Services />
      <TechStack />
      <Work />
      <ExperienceDrive />
      <Contact />
    </>
  );
}
