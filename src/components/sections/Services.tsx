import Section from "@/components/design/Section";
import Heading from "@/components/design/Heading";
import PlusSvg from "@/components/design/PlusSvg";
import { services } from "@/app/constants";

const Services = () => {
  return (
    <Section id="services" crosses>
      <div className="container">
        <Heading
          tag="What I Do"
          title="Built for speed and scale."
          text="I work as an engineer inside product teams — here's where I create the most leverage."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.id}
              className="cursor-target group relative flex flex-col rounded-2xl border border-stroke bg-surface/60 p-7 backdrop-blur-sm transition-colors hover:border-color-1/50"
            >
              <PlusSvg className="absolute right-5 top-5 text-stroke" />
              <span className={`font-code text-sm font-bold ${s.accent}`}>
                0{i + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-text">{s.title}</h3>
              <p className="mt-3 text-text-muted body-2">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Services;
