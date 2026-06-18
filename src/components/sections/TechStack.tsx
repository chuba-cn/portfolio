import Section from "@/components/design/Section";
import Heading from "@/components/design/Heading";
import { techStack } from "@/app/constants";

/**
 * Each stack group is colour-coded like an F1 tyre compound — a "tyre" ring on
 * the category header and a matching compound dot on every chip — so the stack
 * reads as a set-up sheet rather than a generic tag cloud.
 */
const COMPOUNDS = [
  { name: "Soft", color: "#FF3B3B" },
  { name: "Medium", color: "#FFD12E" },
  { name: "Hard", color: "#E8E8E8" },
  { name: "Inter", color: "#3BD16F" },
  { name: "Wet", color: "#3B9BFF" },
  { name: "Ultra", color: "#AC6AFF" },
];

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
          {techStack.map((group, gi) => {
            const compound = COMPOUNDS[gi % COMPOUNDS.length];
            return (
              <div
                key={group.category}
                className="rounded-2xl border border-stroke bg-surface/60 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-code text-xs font-bold uppercase tracking-wider text-color-1">
                    {/* Tyre marking */}
                    <span
                      className="h-3 w-3 rounded-full border-2"
                      style={{ borderColor: compound.color }}
                    />
                    {group.category}
                  </h3>
                  <span
                    className="font-code text-[0.6rem] uppercase tracking-[0.2em]"
                    style={{ color: compound.color }}
                  >
                    {compound.name}
                  </span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 rounded-lg border border-stroke bg-bg/40 px-3 py-1.5 text-sm text-text-muted transition-colors hover:border-color-1/50 hover:text-text"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: compound.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default TechStack;
