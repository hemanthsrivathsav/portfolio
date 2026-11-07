import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { ScrollRail, useIsRailClone } from "../components/ScrollRail";
import { GithubIcon } from "../components/BrandIcons";
import { followCardLink } from "../components/cardLink";
import { mutedText, softSurface, subtleText } from "../styles";
import { projects, type Project } from "../data/portfolio";

/** In-page anchor of a project's card, e.g. `project-spend-sense-rn`. */
export const projectAnchor = (p: Project) => `project-${p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

const AUTO_PLAY_MS = 2500;

const buttonClass = `inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 ${softSurface}`;

function ProjectCard({ project: p }: { project: Project }) {
  const primaryRef = useRef<HTMLAnchorElement>(null);
  const clone = useIsRailClone();
  const clickable = Boolean(p.live ?? p.repo);

  return (
    <article
      id={clone ? undefined : projectAnchor(p)}
      onClick={clickable ? (e) => followCardLink(e, primaryRef.current) : undefined}
      className={`flex scroll-mt-24 flex-col rounded-3xl border p-6 backdrop-blur-md ${
        p.featured ? "w-[min(85vw,30rem)] border-sky-300 bg-sky-50/80 dark:border-sky-400/40 dark:bg-sky-400/10" : "w-[min(85vw,22rem)] border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/5"
      } ${clickable ? "cursor-pointer transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-400/15" : ""}`}
    >
      {p.featured && <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">Featured project</div>}
      <h3 className="text-xl font-semibold">{p.title}</h3>
      {p.subtitle && <p className="mt-1 text-sm font-medium">{p.subtitle}</p>}
      <p className={`mt-3 leading-relaxed ${mutedText}`}>{p.desc}</p>
      {p.award && <p className="mt-3 text-sm font-medium text-amber-700 dark:text-amber-300">🏆 {p.award}</p>}

      {p.technologies && (
        <ul aria-label={`${p.title} technologies`} className="mt-4 flex flex-wrap gap-1.5">
          {p.technologies.map((t) => (
            <li key={t} className="rounded-lg bg-sky-100 px-2 py-1 text-xs text-sky-950 dark:bg-sky-400/10 dark:text-sky-100">
              {t}
            </li>
          ))}
        </ul>
      )}

      {p.details && (
        <details className="mt-4">
          <summary tabIndex={clone ? -1 : undefined} className="cursor-pointer rounded-sm text-sm font-medium text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 dark:text-sky-300">
            How it's built
          </summary>
          <ul className={`mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed ${subtleText}`}>
            {p.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </details>
      )}

      {clickable && (
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {p.live && (
            <a ref={primaryRef} href={p.live} tabIndex={clone ? -1 : undefined} target="_blank" rel="noopener noreferrer" className={buttonClass}>
              Live demo <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {p.repo && (
            <a ref={p.live ? undefined : primaryRef} href={p.repo} tabIndex={clone ? -1 : undefined} target="_blank" rel="noopener noreferrer" className={buttonClass}>
              <GithubIcon className="h-4 w-4" /> Source
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollRail title="Projects" autoPlayMs={AUTO_PLAY_MS} description="What I've built, and how. Click a card to open the live app or its source.">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </ScrollRail>
      </div>
    </section>
  );
}
