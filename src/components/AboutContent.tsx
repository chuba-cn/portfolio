import profilePic from "../../public/images/profile/profile-pic.png";
import Image from "next/image";
import AnimatedNumbers from "@/components/AnimatedNumbers";

const AboutContent = () => {
  return (
    <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
      <div className="col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8">
        <h2 className="mb-4 font-bold uppercase text-lg text-dark/75 dark:text-light/75">
          About Me
        </h2>
        <p className="font-normal mb-4">
          Hey! I&apos;m Chuba. I build fast, scalable, and user-friendly web
          applications that solve real-world problems. My journey started in
          automotive engineering, but I found my passion in software
          development—turning complex ideas into seamless digital experiences.
        </p>
        <p className="font-normal">
          I specialize in React, Next.js, TypeScript, and backend technologies
          like Node.js and MongoDB, creating performant and accessible
          applications. For me, great engineering isn’t just about writing clean
          code—it’s about building solutions that scale, handle real-time data
          efficiently, and feel intuitive for users.
        </p>
        <p className="font-normal my-4">
          When I&apos;m not coding, you’ll probably find me watching and analyzing Formula 1
          race strategies or exploring new tech trends.
        </p>
        <p className="font-normal">
          Want to build something that makes a real difference? Let&apos;s talk.
          💻✨
        </p>
      </div>

      <div className="col-span-3 relative h-full border-2 border-dark border-solid bg-light dark:bg-dark dark:border-light p-8 flex items-center justify-center rounded-2xl xl:col-span-4 md:order-1 md:col-span-8">
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
      <div
        className={
          "col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3"
        }
      >
        <div
          className={"flex flex-col items-end justify-center xl:items-center"}
        >
          <span
            className={
              "inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl"
            }
          >
            <AnimatedNumbers value={5} />+
          </span>
          <h2
            className={
              "text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm"
            }
          >
            Satisfied Clients
          </h2>
        </div>

        <div
          className={"flex flex-col items-end justify-center xl:items-center"}
        >
          <span
            className={
              "inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl"
            }
          >
            <AnimatedNumbers value={5} />+
          </span>
          <h2
            className={
              "text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm"
            }
          >
            Projects Completed
          </h2>
        </div>

        <div
          className={"flex flex-col items-end justify-center xl:items-center"}
        >
          <span
            className={
              "inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl"
            }
          >
            <AnimatedNumbers value={2} />+
          </span>
          <h2
            className={
              "text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm"
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
