import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import Section from "@/components/design/Section";
import TagLine from "@/components/design/TagLine";
import Button from "@/components/design/Button";
import Magnetic from "@/components/design/Magnetic";
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

const Contact = () => {
  return (
    <Section id="contact" crosses>
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-stroke bg-surface/60 px-6 py-16 text-center backdrop-blur-sm md:px-12 md:py-20">
          {/* Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, #AC6AFF 0%, transparent 70%)",
              opacity: "calc(0.3 * var(--glow-opacity))",
            }}
          />

          <div className="relative">
            <TagLine className="mb-5 justify-center">Contact</TagLine>
            <h2 className="h2 mx-auto max-w-2xl text-text">
              Let&apos;s build something that makes a real difference.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-text-muted body-2">
              Open to engineering roles and the occasional freelance project.
              The fastest way to reach me is email.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <Button href={`mailto:${EMAIL}`} solid>
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email me
                  </span>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href="/Chuba-Resume.pdf" download>
                  Download Résumé
                </Button>
              </Magnetic>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3">
              {socials.map((s) => {
                const Icon = iconFor(s.id);
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.title}
                    className="cursor-target flex h-11 w-11 items-center justify-center rounded-full border border-stroke text-text-muted transition-colors hover:border-color-1 hover:text-color-1"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
