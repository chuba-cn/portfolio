import { Metadata } from "next";
import LayoutPage from "@/components/LayoutPage";
import AnimatedHeroText from "@/components/AnimatedHeroText";
import FeaturedProject from "@/components/FeaturedProject";
import veloraImage from "../../../public/images/projects/velora-1.png";
import devlinksImage from "../../../public/images/projects/devlinks-1.png";
import promptHubImage from "../../../public/images/projects/prompt-hub.png";
import callifyImage from "../../../public/images/projects/callify-1.png";
import Project from "@/components/Project";

export const metadata: Metadata = {
  title: "Chuba | Projects",
  description: "Take a look at some of my works",
};

const ProjectPage = () => {
  return (
    <main
      className={
        "w-full mb-16 flex flex-col items-center justify-center dark:text-light"
      }
    >
      <LayoutPage className={"pt-16"}>
        <AnimatedHeroText
          text={"Imagination Fuels Innovation!"}
          shouldCenter
          className="lg:!text-7xl text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl mb-16"
        />
        <div
          className={
            "grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0"
          }
        >
          <div className={"col-span-12"}>
            <FeaturedProject
              title="Velora (AI-Powered Email Client)"
              summary="An AI-powered email platform similar to Gmail that incorporates advanced features such as Retrieval-Augmented Generation (RAG), vector search, smart compose, and a context-aware chatbot for querying email history. It also integrates Stripe for managing payments and subscriptions."
              link="https://velora-three.vercel.app/"
              type="Featured Project"
              img={veloraImage}
              github="https://github.com/chuba-cn/velora"
            />
          </div>
          <div className="col-span-6 sm:col-span-12">
            <Project
              title="Devlinks"
              link=" https://devlinks-theta-six.vercel.app/"
              type="Link Sharing Platform"
              img={devlinksImage}
              github="https://github.com/chuba-cn/devlinks"
            />
          </div>
          <div className="col-span-6 sm:col-span-12">
            <Project
              title="Prompt Hub"
              link="https://prompthub-theta.vercel.app/"
              type="AI"
              img={promptHubImage}
              github="https://github.com/chuba-cn/Prompt-Hub"
            />
          </div>

          <div className={"col-span-12"}>
            <FeaturedProject
              title="Callify"
              summary="A Next.js and TypeScript-based video conferencing application replicating Zoom. It enables users to securely log in, create meetings, and access comprehensive meeting functionalities such as recording, screen sharing, managing participants, scheduling future meetings, and more—all with a responsive design for an optimal experience across devices."
              link="https://callify.vercel.app/"
              type="Featured Project"
              img={callifyImage}
              github="https://github.com/chuba-cn/callify"
            />
          </div>
        </div>
      </LayoutPage>
    </main>
  );
};

export default ProjectPage;
