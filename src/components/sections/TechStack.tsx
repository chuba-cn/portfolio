import Section from "@/components/design/Section";
import Heading from "@/components/design/Heading";
import TyreIcon, { COMPOUNDS, type Compound } from "@/components/racing/TyreIcon";
import { techStack } from "@/app/constants";

/**
 * Each stack group is assigned an F1 tyre compound — drawn as an actual tyre
 * (coloured sidewall band + compound letter) — so the stack reads as a set-up
 * sheet. Compounds are chosen so no two adjacent groups share one.
 */
const GROUP_COMPOUNDS: Compound[] = [
  "hard", // Languages — the durable bedrock
  "medium", // Frameworks — the balanced all-rounder
  "wet", // State & Data
  "soft", // Real-time — maximum pace
  "inter", // Styling & UI
  "hard", // Tooling
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
            const compound = GROUP_COMPOUNDS[gi % GROUP_COMPOUNDS.length];
            const color = COMPOUNDS[compound].color;
            return (
              <div
                key={group.category}
                className="rounded-2xl border border-stroke bg-surface/60 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-code text-xs font-bold uppercase tracking-wider text-color-1">
                    {group.category}
                  </h3>
                  <TyreIcon compound={compound} size={42} className="shrink-0" />
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 rounded-lg border border-stroke bg-bg/40 px-3 py-1.5 text-sm text-text-muted transition-colors hover:border-color-1/50 hover:text-text"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: color }}
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
