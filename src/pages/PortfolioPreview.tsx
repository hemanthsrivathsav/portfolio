import { useLayoutEffect } from "react";
import { Award, Blocks, Briefcase, Cpu, FileText } from "lucide-react";
import Particles from "../components/Particles";
import { Dock } from "../components/Dock";
import { Bento } from "../components/Bento";
import { Carousel } from "../components/Carousel";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useParallax } from "../hooks/useParallax";
import { ProjectsSection, projectAnchor } from "../sections/ProjectsSection";
import { HighlightsSection } from "../sections/HighlightsSection";
import { BG_LEVELS, isBgLevel, isTheme } from "../types";
import { mutedText, softSurface, subtleText } from "../styles";
import { about, certifications, experiments, highlights, now, paper, profile, projects, skills } from "../data/portfolio";

const linkPill = `rounded-2xl px-4 py-2 transition-transform duration-200 hover:-translate-y-0.5 ${softSurface}`;

export default function PortfolioPreview() {
  const headerRef = useParallax<HTMLDivElement>(60, 400);

  const [theme, setTheme] = useLocalStorageState("theme", "dark", isTheme);
  const [bgLevel, setBgLevel] = useLocalStorageState("bg-level", "mid", isBgLevel);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  return (
    <div className="relative z-10 min-h-screen bg-white/60 text-slate-900 antialiased transition-colors dark:bg-slate-950/70 dark:text-white">
      <Particles level={bgLevel} theme={theme} />
      <Dock
        bgLevel={bgLevel}
        onCycleBg={() => setBgLevel((l) => BG_LEVELS[(BG_LEVELS.indexOf(l) + 1) % BG_LEVELS.length])}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      />

      <header id="home" className="relative pb-10 pt-28 sm:pt-36">
        <div ref={headerRef} className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="opacity-80 transition hover:opacity-100">
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="opacity-80 transition hover:opacity-100">
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </div>
              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">{profile.name}</h1>
              <p className={`mt-3 max-w-prose text-lg sm:text-xl ${mutedText}`}>{profile.tagline}</p>
            </div>
            <div className="aspect-square rounded-3xl bg-linear-to-br from-sky-300/60 to-violet-400/60 p-1 shadow-2xl dark:from-sky-400/60 dark:to-violet-600/60">
              <div className="grid h-full w-full place-items-center rounded-2xl bg-white/40 dark:bg-black/40">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  width={250}
                  height={250}
                  fetchPriority="high"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-auto max-w-[250px] select-none rounded-2xl object-cover [-webkit-touch-callout:none]"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            {/*
              Fixed bento layout. On large screens the board is three columns (left, middle spanning two
              tracks, right). Below lg the column wrappers use `display: contents`, so the tiles flow into
              the responsive grid in the order set by `max-lg:order-*`.
            */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
              <div className="contents lg:flex lg:flex-col lg:gap-5">
                <div className="max-lg:order-1">
                  <Bento title="Projects" icon={<Briefcase className="h-5 w-5" />} link={{ href: "#projects", label: "See all projects" }}>
                    <div className="space-y-3">
                      {projects.map((p) => (
                        <a
                          key={p.title}
                          href={`#${projectAnchor(p)}`}
                          className={`block rounded-2xl border p-3 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-400/20 dark:hover:shadow-sky-500/20 ${
                            p.featured
                              ? "border-sky-300 bg-sky-50 dark:border-sky-400/40 dark:bg-sky-400/10"
                              : "border-black/10 bg-white hover:bg-white/90 dark:border-white/10 dark:bg-white/10"
                          }`}
                        >
                          {p.featured && <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">Featured</div>}
                          <h3 className="font-medium">{p.title}</h3>
                          <p className={`text-sm ${subtleText}`}>{p.subtitle ?? p.desc}</p>
                          {p.award && <div className="mt-1 text-xs font-medium text-amber-700 dark:text-amber-300">🏆 {p.award}</div>}
                        </a>
                      ))}
                    </div>
                  </Bento>
                </div>
                <div className="max-lg:order-8">
                  <Bento>
                    <Carousel title="Experiments" slides={experiments} />
                  </Bento>
                </div>
              </div>

              <div className="contents lg:col-span-2 lg:flex lg:flex-col lg:gap-5">
                <div className="max-lg:order-2">
                  <Bento title="About" icon={<Blocks className="h-5 w-5" />} link={{ href: profile.linkedin, label: "Full background on LinkedIn" }}>
                    <p className={`leading-relaxed ${mutedText}`}>{about}</p>
                  </Bento>
                </div>
                <div className="contents lg:grid lg:grid-cols-2 lg:items-start lg:gap-5">
                  <div className="max-lg:order-7">
                    <Bento>
                      <Carousel title="Certifications" slides={certifications} />
                    </Bento>
                  </div>
                  <div className="max-lg:order-5">
                    <Bento title="Now">
                      <ul className={`space-y-2 text-sm ${mutedText}`}>
                        {now.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </Bento>
                  </div>
                </div>
                <div id="skills" className="max-lg:order-4">
                  <Bento title="Skills" icon={<Cpu className="h-5 w-5" />}>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((s) => (
                        <span key={s} className="rounded-xl border border-black/10 bg-white px-3 py-1 text-sm shadow-xs dark:border-white/10 dark:bg-white/10 dark:shadow-none">
                          {s}
                        </span>
                      ))}
                    </div>
                  </Bento>
                </div>
                <div className="max-lg:order-9">
                  <Bento title="Links">
                    <div className="flex flex-wrap gap-3">
                      <a href={profile.github} target="_blank" rel="noopener noreferrer" className={linkPill}>
                        <GithubIcon className="mr-2 inline-block h-4 w-4" />
                        GitHub
                      </a>
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={linkPill}>
                        <LinkedinIcon className="mr-2 inline-block h-4 w-4" />
                        LinkedIn
                      </a>
                    </div>
                  </Bento>
                </div>
              </div>

              <div className="contents lg:flex lg:flex-col lg:gap-5">
                <div className="max-lg:order-3">
                  <Bento title="Highlights" icon={<Award className="h-5 w-5" />} link={{ href: "#highlights", label: "See highlights and LinkedIn posts" }}>
                    <ul className={`space-y-2 text-sm ${mutedText}`}>
                      {highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </Bento>
                </div>
                <div id="paper" className="max-lg:order-6">
                  <Bento title="Paper Publishings" icon={<FileText className="h-5 w-5" />} link={{ href: paper.href, label: "Read the paper on Springer" }}>
                    <a href={paper.href} target="_blank" rel="noopener noreferrer" className="font-medium leading-snug hover:underline">
                      {paper.title}
                    </a>
                    <div className={`mt-1 text-xs ${subtleText}`}>
                      {paper.venue} · {paper.coAuthors}
                    </div>
                    <p className={`mt-3 text-sm leading-relaxed ${mutedText}`}>{paper.summary}</p>
                    <a href={paper.href} target="_blank" rel="noopener noreferrer" className={`mt-4 inline-block text-sm ${linkPill}`}>
                      Read on Springer →
                    </a>
                  </Bento>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProjectsSection />
        <HighlightsSection />
      </main>

      <footer className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mt-8 text-center text-sm text-slate-600 dark:text-white/60">Built with React + Tailwind · Bento layout · Fully responsive.</div>
        </div>
      </footer>
    </div>
  );
}
