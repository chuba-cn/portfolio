import { Github, Linkedin, Twitter } from "lucide-react";
import { socials, EMAIL } from "@/app/constants";

const iconFor = (id: string) => {
  switch (id) {
    case "github":
      return Github;
    case "linkedin":
      return Linkedin;
    case "twitter":
      return Twitter;
    default:
      return Github;
  }
};

const Footer = () => {
  return (
    <footer className="relative border-t border-stroke">
      <div className="container flex flex-col items-center gap-6 py-10 md:flex-row md:justify-between">
        <p className="font-code text-xs uppercase tracking-wider text-text-muted">
          © {new Date().getFullYear()} Chinemelum Chuba-Nwene
        </p>

        <p className="order-first font-code text-xs uppercase tracking-wider text-text-muted md:order-none">
          Built with Next.js &amp; Tailwind
        </p>

        <div className="flex items-center gap-3">
          {socials.map((s) => {
            const Icon = iconFor(s.id);
            return (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.title}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke text-text-muted transition-colors hover:border-color-1 hover:text-color-1"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
          <a
            href={`mailto:${EMAIL}`}
            className="ml-1 font-code text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-color-1"
          >
            Say hello
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
