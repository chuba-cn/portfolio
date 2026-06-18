import Section from "@/components/design/Section";
import TagLine from "@/components/design/TagLine";
import { metrics } from "@/app/constants";

const About = () => {
  return (
    <Section id="about" crosses>
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Bio (frosted glass so the car reads softly behind it) */}
          <div className="rounded-3xl border border-stroke bg-surface/40 p-6 backdrop-blur-md md:p-8 lg:col-span-7">
            <TagLine className="mb-4">About</TagLine>
            <h2 className="h2 max-w-2xl text-text">
              From mechatronics to interfaces that ship.
            </h2>
            <div className="mt-6 max-w-2xl space-y-4 text-text-muted body-2">
              <p>
                I started in mechatronics engineering but found my craft in
                software — turning complex requirements into fast, accessible,
                real-time products. Today I lead frontend at TheTravelHunters,
                where I&apos;ve cut manual ops, unlocked new revenue, and
                tightened performance budgets.
              </p>
              <p>
                I care about systems that scale, data that moves in real time,
                and UIs that feel effortless. I work primarily in React,
                Next.js, and TypeScript, with backend and real-time tech like
                Node.js, tRPC, PostgreSQL, and WebSockets. Off the clock:
                Formula 1 strategy and systems programming with Rust.
              </p>
            </div>
          </div>

          {/* Impact metrics */}
          <div className="lg:col-span-5">
            <p className="mb-5 font-code text-xs uppercase tracking-wider text-text-muted">
              Selected impact
            </p>
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-stroke bg-surface/60 p-5 backdrop-blur-sm transition-colors hover:border-color-1/50"
                >
                  <p className="text-3xl font-bold text-text md:text-4xl">
                    {m.prefix}
                    {m.value}
                  </p>
                  <p className="mt-2 font-code text-[0.7rem] uppercase leading-snug tracking-wider text-text-muted">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
