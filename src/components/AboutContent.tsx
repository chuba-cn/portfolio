import profilePic from "../../public/images/profile/profile-pic.png";
import Image from "next/image";
import AnimatedNumbers from "@/components/AnimatedNumbers";

const AboutContent = () => {
  return (
    <div className="grid w-full grid-cols-8 gap-16">
      <div className="col-span-3 flex flex-col items-start justify-start">
        <h2 className="mb-4 font-bold uppercase text-lg text-dark/75 dark:text-light/75">
          About Me
        </h2>
        <p className="font-normal mb-4">
          Hey! I&apos;m Chuba. Web development isn&apos;t just my job –
          it&apos;s where I get to solve real-world problems and create digital
          experiences that actually matter to people. I&apos;ve always been
          driven by this crazy idea that technology should make life easier, not
          more complicated.
        </p>
        <p className="font-normal">
          After moving from automotive engineering into web development,
          I&apos;ve learned that great design is about understanding people. My
          work isn&apos;t about writing perfect code – it&apos;s about crafting
          solutions that click with users and that feel intuitive the moment
          someone lands on a page.
        </p>
        <p className="font-normal my-4">
          When I&apos;m not diving into a challenging project, you&apos;ll
          probably catch me watching Formula 1, geeking out about race
          strategies – which, turns out, isn&apos;t that different from
          debugging a tricky coding issue. Both require patience, strategic
          thinking, and understanding complex systems.
        </p>
        <p className="font-normal">
          Want to build something that makes a real difference? Let&apos;s talk.
          💻✨
        </p>
      </div>

      <div className="col-span-3 relative h-full border-2 border-dark border-solid bg-light dark:bg-dark dark:border-light p-8 flex items-center justify-center rounded-2xl">
        <div
          className={
            "flex items-center justify-center bg-dark rounded-2xl h-[90%]"
          }
        >
          <div
            className={
              "absolute top-0 -right-3 -z-10 w-[102%] h-[103%] bg-dark rounded-[2rem] dark:bg-light"
            }
          />
          <Image
            alt="profile-pic"
            src={profilePic}
            className="w-full h-full object-cover rounded-2xl"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className={"col-span-2 flex flex-col items-end justify-between"}>
        <div className={"flex flex-col items-end justify-center"}>
          <span className={"inline-block text-7xl font-bold"}>
            <AnimatedNumbers value={50} />+
          </span>
          <h2
            className={
              "text-xl font-medium capitalize text-dark/75 dark:text-light/75"
            }
          >
            Satisfied Clients
          </h2>
        </div>

        <div className={"flex flex-col items-end justify-center"}>
          <span className={"inline-block text-7xl font-bold"}>
            <AnimatedNumbers value={40} />+
          </span>
          <h2
            className={
              "text-xl font-medium capitalize text-dark/75 dark:text-light/75"
            }
          >
            Projects Completed
          </h2>
        </div>

        <div className={"flex flex-col items-end justify-center"}>
          <span className={"inline-block text-7xl font-bold"}>
            <AnimatedNumbers value={2} />+
          </span>
          <h2
            className={
              "text-xl font-medium capitalize text-dark/75 dark:text-light/75"
            }
          >
            Years of Experience
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
