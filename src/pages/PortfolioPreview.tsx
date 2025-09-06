import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Award, Cpu, Blocks, Github, Linkedin, Mail } from "lucide-react";
import Particles from "../components/Particles";
import { Dock } from "../components/Dock";
import { Bento } from "../components/Bento";
import { DraggableItem, type Baseline } from "../components/Draggable";
import { usePersistentPositions, type Positions } from "../hooks/usePersistentPositions";
import { CertificatesCarousel, CertCarouselHandle } from "../components/CertificatesCarousel";



export default function PortfolioPreview() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 400], [0, -60]);

  const [bgLevel, setBgLevel] = useState<"low" | "mid" | "high">("mid");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const isLight = theme === "light";
  const cycleLevel = () => setBgLevel((p) => (p === "low" ? "mid" : p === "mid" ? "high" : "low"));
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const STORAGE_KEY = "bento-layout-v1";
  const SAVE_KEY = "bento-layout-saved-v1";
  const [positions, setPositions] = usePersistentPositions(STORAGE_KEY);

  const [abs, setAbs] = useState(false);
  const [baseline, setBaseline] = useState<Baseline>({});
  const [boardH, setBoardH] = useState<number | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);

  const certCtrl = useRef<CertCarouselHandle>(null);
  const experimentCtrl = useRef<CertCarouselHandle>(null);

  const resetLayout = () => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const parsed: Positions = JSON.parse(saved);
        setPositions(parsed);
        setAbs(true);
        return;
      }
    } catch {}

    setPositions({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setAbs(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const board = boardRef.current;
        if (!board) return;
        const br = board.getBoundingClientRect();
        const next: Baseline = {};
        board.querySelectorAll<HTMLElement>("[data-key]").forEach((el) => {
          const r = el.getBoundingClientRect();
          const key = el.dataset.key!;
          next[key] = { x: r.left - br.left, y: r.top - br.top, w: r.width, h: r.height };
        });
        setBoardH(br.height);
        setBaseline(next);
        setAbs(true);
      })
    );
  };

  const saveLayout = () => {
    const out: Positions = {};
    Object.keys(baseline).forEach((k) => {
      const base = baseline[k];
      const p = positions[k] ?? (base ? { x: base.x, y: base.y } : { x: 0, y: 0 });
      out[k] = { x: Math.round(p.x), y: Math.round(p.y) };
    });
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(out));
    } catch {}
  };

  // Measure original grid layout then switch to absolute items
  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    setAbs(false);

    const measure = () => {
      if (!boardRef.current) return;
      const br = boardRef.current.getBoundingClientRect();
      const next: Baseline = {};
      boardRef.current.querySelectorAll<HTMLElement>("[data-key]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const key = el.dataset.key!;
        next[key] = { x: r.left - br.left, y: r.top - br.top, w: r.width, h: r.height };
      });
      setBoardH(br.height);
      setBaseline(next);
      setAbs(true);
    };

    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(measure);
      (window as any).__raf2 = raf2;
    });

    const onResize = () => {
      setAbs(false);
      requestAnimationFrame(() => requestAnimationFrame(measure));
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf1);
      if ((window as any).__raf2) cancelAnimationFrame((window as any).__raf2);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const skills = useMemo(
    () => [
      "Python",
      "AWS",
      "PySpark",
      "FastAPI",
      "Kubernetes",
      "React",
      "TypeScript",
      "Node.js",
      "TailwindCSS",
      "Docker",
      "PostgreSQL",
      "Git",
    ],
    []
  );

  const projects = [
    { title: "Gamified AWS Learner", desc: "Learn AWS via quests and badges.", link: "#" },
    { title: "Spend Sense (RN)", desc: "Reads SMS to categorize spends.", link: "#" },
    { title: "Carbon-Smart Coding", desc: "Lower energy footprint of code.", link: "#" },
  ];

const certImages = [
  // Image source (PNG) served by Accredible:
  "https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/84890241",
  "Coming Soon",
  "/certs/cert-3.jpg",
];

const certLinks = [
  // Click-through target for the first image:
  "https://www.credential.net/27880ce5-bd18-47db-9245-2f9f98de7ccb#acc.4G30f6lb",
  "#",
];

const expImages = [
  // Image source (PNG) served by Accredible:
  "./favicon-c2-removebg-preview.png",
  "./rem@1.jpg",
];

const expLinks = [
  // Click-through target for the first image:
  "https://hemanthsrivathsav.vercel.app/",
  "https://my.spline.design/untitled-0741ae787374a9c52a8ebcec7f96d867/",
];




  return (
    <div className={`relative z-10 min-h-screen antialiased transition-colors ${isLight ? "bg-white/60 text-slate-900" : "bg-slate-950/70 text-white"}`}>
      <Particles level={bgLevel} theme={theme} />
      <Dock bgLevel={bgLevel} onCycleBg={cycleLevel} theme={theme} onToggleTheme={toggleTheme} onReset={resetLayout} onSave={saveLayout} />

      {/* Header */}
      <header id="home" className="relative pt-28 sm:pt-36 pb-10">
        <motion.div style={{ y: y1 }} className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <a href="https://github.com/hemanthsrivathsav" target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 transition"><Github className="h-5 w-5" /></a>
                <a href="https://www.linkedin.com/in/n-hemanth-srivathsav/" target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 transition"><Linkedin className="h-5 w-5" /></a>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">N. Hemanth Srivathsav</h1>
              <p className={`mt-3 text-lg sm:text-xl max-w-prose ${isLight ? "text-slate-700" : "text-white/80"}`}>
                Software Engineer @ JPMorgan Chase &amp; Co. • Practical ML &amp;  • Cloud &amp; AWS fan.
              </p>
            </div>
            <div className="relative">
              <div className={`aspect-square rounded-3xl p-1 shadow-2xl ${isLight ? "bg-gradient-to-br from-sky-300/60 to-violet-400/60" : "bg-gradient-to-br from-sky-400/60 to-violet-600/60"}`}>
                <div className={`h-full w-full rounded-2xl grid place-items-center ${isLight ? "bg-white/40" : "bg-black/40"}`}>
                  <div className="relative select-none" onContextMenu={(e) => e.preventDefault()}>
                    <img src="./Me2.jpg" alt="My Profile" className="max-w-[250px] max-h-[250px] object-cover rounded-2xl select-none" draggable={false} onDragStart={(e) => e.preventDefault()} style={{ WebkitUserDrag: "none", userSelect: "none", WebkitTouchCallout: "none" }} />
                    <span className="absolute inset-0" aria-hidden="true" onContextMenu={(e) => e.preventDefault()} onMouseDown={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Bento grid */}
      <main>
        <section className="pb-16" id="about">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div ref={boardRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(120px,auto)] gap-5 relative" style={{ height: abs ? boardH ?? undefined : undefined }}>
              {/* Projects */}
              <DraggableItem itemKey="projects" htmlId="projects" className="lg:row-span-2" boardRef={boardRef} positions={positions} setPositions={setPositions} abs={abs} baseline={baseline}>
                <Bento theme={theme}>
                  <div className="flex items-center gap-3 mb-3">
                    <Briefcase className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">Projects</h2>
                  </div>
                  <div className="space-y-3">
                    {projects.map((p) => (
                      <a key={p.title} href={p.link} target="#" rel="noreferrer" className={`block rounded-2xl p-3 border transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl ${isLight ? "border-black/10 bg-white hover:bg-white/90 hover:shadow-sky-400/20" : "border-white/10 bg-white/10 hover:shadow-sky-500/20"}`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{p.title}</div>
                            <div className={`${isLight ? "text-slate-600" : "text-white/70"} text-sm`}>{p.desc}</div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </Bento>
              </DraggableItem>

              {/* About */}
              <DraggableItem itemKey="about" className="lg:col-span-2 lg:row-span-2" boardRef={boardRef} positions={positions} setPositions={setPositions} abs={abs} baseline={baseline}>
                <Bento theme={theme}>
                  <div className="flex items-center gap-3 mb-3">
                    <Blocks className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">About</h2>
                  </div>
                  <p className={`${isLight ? "text-slate-700" : "text-white/80"} leading-relaxed`}>
                    I build data-driven, delightful experiences. Recently: gamified AWS learning, optimized Kubernetes jobs for heavy file conversions, shipped a React Native spend tracker.
                  </p>
                </Bento>
              </DraggableItem>

              {/* Highlights */}
              <DraggableItem itemKey="highlights" boardRef={boardRef} positions={positions} setPositions={setPositions} abs={abs} baseline={baseline}>
                <Bento theme={theme}>
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">Highlights</h2>
                  </div>
                  <ul className={`${isLight ? "text-slate-700" : "text-white/80"} text-sm space-y-2`}>
                    <li>🏆 Won Tech_Sustainability Hackathon @JPMC</li>
                    <li>🏆 Won Sepathon @JPMC</li>
                    <li>🎓 B.Tech CSE (AI&ML), KL University</li>
                    <li>☁️ AWS Cloud Practitioner prep</li>
                  </ul>
                </Bento>
              </DraggableItem>


              {/* Skills */}
              <DraggableItem itemKey="skills" htmlId="skills" className="lg:col-span-2" boardRef={boardRef} positions={positions} setPositions={setPositions} abs={abs} baseline={baseline}>
                <Bento theme={theme}>
                  <div className="flex items-center gap-3 mb-3">
                    <Cpu className="h-5 w-5" />
                    <h2 className="text-xl font-semibold">Skills</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <span key={s} className={`rounded-xl px-3 py-1 text-sm border ${isLight ? "border-black/10 bg-white shadow-sm" : "border-white/10 bg-white/10"}`}>{s}</span>
                    ))}
                  </div>
                </Bento>
              </DraggableItem>

              {/* Now */}
              <DraggableItem itemKey="now" boardRef={boardRef} positions={positions} setPositions={setPositions} abs={abs} baseline={baseline}>
                <Bento theme={theme}>
                  <h2 className="text-xl font-semibold mb-3">Now</h2>
                  <ul className={`${isLight ? "text-slate-700" : "text-white/80"} text-sm space-y-2`}>
                    <li>Learning: AWS • K8- kubernetes </li>
                    <li>Building: RN spending tracker</li>
                    <li>Reading: Systems Design</li>
                  </ul>
                </Bento>
              </DraggableItem>

              {/* Open Source */}
              <DraggableItem itemKey="oss" boardRef={boardRef} positions={positions} setPositions={setPositions} abs={abs} baseline={baseline}>
                <Bento theme={theme}>
                  <h2 className="text-xl font-semibold mb-3">Open Source</h2>
                  <div className={`${isLight ? "text-slate-600" : "text-white/70"} text-sm`}>Coming soon</div>
                </Bento>
              </DraggableItem>

              {/* Certifications */}
              <DraggableItem itemKey="certs" boardRef={boardRef} positions={positions} setPositions={setPositions} abs={abs} baseline={baseline}>
                <Bento theme={theme}>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold">Certifications</h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => certCtrl.current?.prev()}
                        className={`h-8 w-8 grid place-items-center rounded-full border ${isLight ? "border-black/10 bg-white hover:bg-black/5" : "border-white/15 bg-white/10 hover:bg-white/20"}`}
                        aria-label="Previous"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => certCtrl.current?.next()}
                        className={`h-8 w-8 grid place-items-center rounded-full border ${isLight ? "border-black/10 bg-white hover:bg-black/5" : "border-white/15 bg-white/10 hover:bg-white/20"}`}
                        aria-label="Next"
                      >
                        ›
                      </button>
                    </div>
                  </div>

                  <CertificatesCarousel
                    images={certImages}
                    links={certLinks}
                    isLight={isLight}
                    controlsRef={certCtrl}   // ⬅️ connects the buttons to the carousel
                    // showButtons={false}    // (default) we’re rendering buttons in the header
                  />
                </Bento>
              </DraggableItem>

              {/* Experiments */}
              <DraggableItem itemKey="experiments" boardRef={boardRef} positions={positions} setPositions={setPositions} abs={abs} baseline={baseline}>
                <Bento theme={theme}>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold">Experiments</h2>
                    <div className="flex gap-2">
                      <button
                        type = "button"
                        onClick={() => experimentCtrl.current?.prev()}
                        className={`h-8 w-8 grid place-items-center rounded-full border ${isLight ? "border-black/10 bg-white hover:bg-black/5" : "border-white/15 bg-white/10 hover:bg-white/20"}`}
                        aria-label="Previous"
                      >
                        ‹
                      </button>
                      <button
                        type = "button"
                        onClick={() => experimentCtrl.current?.next()}
                        className={`h-8 w-8 grid place-items-center rounded-full border ${isLight ? "border-black/10 bg-white hover:bg-black/5" : "border-white/15 bg-white/10 hover:bg-white/20"}`}
                        aria-label="Next"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                  <CertificatesCarousel
                    images={expImages}
                    links={expLinks}
                    isLight={isLight}
                    controlsRef={experimentCtrl}   // ⬅️ connects the buttons to the carousel
                    // showButtons={false}    // (default) we’re rendering buttons in the header
                  />
                </Bento>
              </DraggableItem>

              {/* Links */}
              <DraggableItem itemKey="links" className="lg:col-span-2" boardRef={boardRef} positions={positions} setPositions={setPositions} abs={abs} baseline={baseline}>
                <Bento theme={theme}>
                  <h2 className="text-xl font-semibold mb-3">Links</h2>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://github.com/hemanthsrivathsav" target="_blank" rel="noreferrer" className={`rounded-2xl px-4 py-2 border transition-transform duration-200 hover:-translate-y-0.5 ${isLight ? "border-black/10 bg-white hover:bg-black/5" : "border-white/15 bg-white/10 hover:bg-white/20"}`}><Github className="inline-block h-4 w-4 mr-2" />GitHub</a>
                    <a href="https://www.linkedin.com/in/n-hemanth-srivathsav/" target="_blank" rel="noreferrer" className={`rounded-2xl px-4 py-2 border transition-transform duration-200 hover:-translate-y-0.5 ${isLight ? "border-black/10 bg-white hover:bg-black/5" : "border-white/15 bg-white/10 hover:bg-white/20"}`}><Linkedin className="inline-block h-4 w-4 mr-2" />LinkedIn</a>
                  </div>
                </Bento>
              </DraggableItem>
            </div>
          </div>
        </section>
      </main>

      <footer  className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className={`mt-8 text-center text-sm ${isLight ? "text-slate-600" : "text-white/60"}`}>
            Built with React + Tailwind · Bento layout · Fully responsive.
          </div>
        </div>
      </footer>
    </div>
  );
}

export function runTests() {
  const results: { name: string; pass: boolean }[] = [];
  try {
    results.push({ name: "Particles canvas present", pass: !!document.querySelector("canvas") });
    results.push({ name: "Dock has two buttons", pass: document.querySelectorAll("button").length >= 2 });
    const ids = ["home", "about", "skills", "projects"];
    results.push({ name: "Anchors exist", pass: ids.every((id) => document.getElementById(id)) });
  } catch {
    results.push({ name: "General", pass: false });
  }
  return results;
}