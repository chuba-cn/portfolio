import { companies } from "@/app/constants";

const Companies = () => {
  // Duplicate the list so the marquee loops seamlessly
  const row = [...companies, ...companies];

  return (
    <div className="relative border-y border-stroke py-10">
      <div className="container">
        <p className="mb-6 text-center font-code text-xs uppercase tracking-wider text-text-muted">
          Teams &amp; products I&apos;ve built with
        </p>
      </div>

      <div
        className="group relative flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <ul className="flex shrink-0 animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused]">
          {row.map((c, i) => (
            <li key={`${c.name}-${i}`}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap font-grotesk text-2xl font-medium text-text-muted transition-colors hover:text-text md:text-3xl"
              >
                {c.name}
              </a>
            </li>
          ))}
        </ul>
        {/* second identical track for seamless loop */}
        <ul
          aria-hidden
          className="flex shrink-0 animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused]"
        >
          {row.map((c, i) => (
            <li key={`dup-${c.name}-${i}`}>
              <span className="whitespace-nowrap font-grotesk text-2xl font-medium text-text-muted md:text-3xl">
                {c.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Companies;
