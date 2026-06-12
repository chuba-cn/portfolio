import Section from "@/components/design/Section";
import Heading from "@/components/design/Heading";
import { techStack } from "@/app/constants";

const TechStack = () => {
  return (
    <Section id="stack" crosses>
      <div className="container">
        <Heading
          tag="Stack"
          title="Tools I reach for."
          text="The technologies I use day to day to design, build, and ship."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-stroke bg-surface/60 p-6 backdrop-blur-sm"
            >
              <h3 className="font-code text-xs font-bold uppercase tracking-wider text-color-1">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-stroke bg-bg/40 px-3 py-1.5 text-sm text-text-muted transition-colors hover:border-color-1/50 hover:text-text"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TechStack;
