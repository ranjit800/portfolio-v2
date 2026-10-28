"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import NeumorphicLink from "@/components/common/NeumorphicLink";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { featuredProjects } from "@/data/projects";

function ProjectRecord({ project, projectCount, recordRef }) {
  const reduceMotion = useReducedMotion();
  const hasCompanySite = Boolean(project.companyUrl);
  const hasLiveSite = Boolean(project.liveUrl);
  const hasSourceCode = Boolean(project.sourceUrl);

  return (
    <motion.article
      ref={recordRef}
      initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-white/[0.1] py-9 first:border-t-0 first:pt-0 sm:py-12"
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-[#ff8a00]">{project.number} / {String(projectCount).padStart(2, "0")}</p>
          <h3 className="mt-3 max-w-xl font-sans text-3xl font-semibold tracking-[-0.035em] text-[#f8f9fa] sm:text-5xl">{project.title}</h3>
          {project.companyRole && <p className="mt-3 font-mono text-[0.62rem] font-semibold tracking-[0.12em] text-slate-500">{project.companyRole}</p>}
        </div>
        <span className="mt-1 shrink-0 rounded-full border border-[#ff8a00]/30 bg-[#ff8a00]/[0.08] px-3 py-1.5 text-[0.58rem] font-bold tracking-[0.12em] text-[#ffab4b]">{project.type}</span>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0.65, scale: 1.025 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        whileHover={reduceMotion ? undefined : { y: -4 }}
        className="mt-6 overflow-hidden rounded-[1.15rem] border border-white/[0.1] bg-[#0b0f14] shadow-[0_1rem_2.5rem_rgba(0,0,0,0.2)] sm:mt-8"
      >
        <ProjectGallery project={project} />
      </motion.div>

      <div className="mt-6 grid gap-5 border-b border-white/[0.08] pb-8 sm:mt-7 sm:grid-cols-[9rem_1fr]">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-[0.62rem] tracking-[0.1em] sm:block">
          <div className="sm:mb-3"><dt className="text-slate-600">TYPE</dt><dd className="mt-1 font-semibold text-slate-300">{project.type}</dd></div>
          <div><dt className="text-slate-600">STATUS</dt><dd className="mt-1 font-semibold text-[#ffab4b]">{hasCompanySite ? "PROFESSIONAL WORK" : hasLiveSite ? "LIVE PROJECT" : "ARCHIVE PROJECT"}</dd></div>
        </dl>
        <div>
          <p className="max-w-xl text-sm leading-7 text-[#a0aec0] sm:text-base">{project.description}</p>
          {project.impact && <p className="mt-4 max-w-xl border-l border-[#ff8a00]/55 pl-4 text-sm leading-6 text-slate-400"><span className="font-mono text-[0.6rem] font-semibold tracking-[0.12em] text-[#ffab4b]">IMPACT&nbsp; </span>{project.impact}</p>}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => <span key={item} className="rounded-full border border-white/[0.1] bg-white/[0.025] px-3 py-1.5 text-[0.65rem] font-medium text-slate-300">{item}</span>)}
          </div>
          {(hasCompanySite || hasLiveSite || hasSourceCode) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {hasCompanySite && <NeumorphicLink href={project.companyUrl} target="_blank" rel="noreferrer" className="px-4 py-2 text-xs">{project.companyLabel || "Company Site"}</NeumorphicLink>}
              {hasLiveSite && <NeumorphicLink href={project.liveUrl} target="_blank" rel="noreferrer" className="px-4 py-2 text-xs">Live Site</NeumorphicLink>}
              {hasSourceCode && <NeumorphicLink href={project.sourceUrl} target="_blank" rel="noreferrer" className="px-4 py-2 text-xs">Source Code</NeumorphicLink>}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsPreview() {
  const reduceMotion = useReducedMotion();
  const projectRefs = useRef([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = featuredProjects[activeProjectIndex];

  useEffect(() => {
    const projectNodes = projectRefs.current.filter(Boolean);
    if (!projectNodes.length) return undefined;

    const updateActiveProject = () => {
      const viewportCenter = window.innerHeight / 2;
      let nextIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      projectNodes.forEach((node, index) => {
        const bounds = node.getBoundingClientRect();
        const recordCenter = bounds.top + bounds.height / 2;
        const distance = Math.abs(recordCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          nextIndex = index;
        }
      });

      setActiveProjectIndex((currentIndex) => currentIndex === nextIndex ? currentIndex : nextIndex);
    };

    const observer = new IntersectionObserver(updateActiveProject, { threshold: [0, 0.2, 0.5, 0.8, 1] });
    projectNodes.forEach((node) => observer.observe(node));
    window.addEventListener("resize", updateActiveProject);
    updateActiveProject();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateActiveProject);
    };
  }, []);

  return (
    <section id="projects" className="relative overflow-x-clip bg-[#0b0f14] px-6 py-24 sm:px-10 sm:py-32 lg:px-14 lg:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.035)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative mx-auto max-w-[1280px] lg:grid lg:grid-cols-12 lg:gap-14 xl:gap-20">
        <aside className="lg:col-span-4 lg:sticky lg:top-32 lg:h-fit lg:self-start">
          <p className="font-mono text-xs font-semibold tracking-[0.22em] text-[#ff8a00]">CREATIONS</p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-[-0.045em] text-[#f8f9fa] sm:text-6xl xl:text-7xl">Selected<br />works<span className="text-[#ff8a00]">.</span></h2>
          <p className="mt-7 max-w-sm text-base leading-7 text-[#a0aec0]">A focused archive of real products shaped around useful flows, clear information, and details that make the experience feel considered.</p>
          <div className="mt-10 flex items-center gap-4 border-y border-white/[0.1] py-5">
            <span role="status" aria-live="polite" className="sr-only">Project {activeProjectIndex + 1} of {featuredProjects.length}: {activeProject.title}</span>
            <span className="relative inline-flex h-8 min-w-8 items-center overflow-hidden font-mono text-2xl font-semibold text-[#ff8a00]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={activeProject.number}
                  initial={reduceMotion ? false : { opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -7 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
                >
                  {activeProject.number}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="font-mono text-[0.65rem] font-semibold tracking-[0.14em] text-slate-400">/ FEATURED PROJECTS</span>
          </div>
          <div className="mt-8 hidden items-center gap-3 font-mono text-[0.62rem] font-semibold tracking-[0.16em] text-slate-500 lg:flex"><span className="h-px w-10 bg-[#ff8a00]/65" />SCROLL TO EXPLORE</div>
          <NeumorphicLink href="/projects" className="mt-8 px-5 py-2.5 text-xs">View All Projects</NeumorphicLink>
        </aside>

        <div className="mt-14 lg:col-span-8 lg:mt-0">
          {featuredProjects.map((project, index) => (
            <ProjectRecord
              key={project.slug}
              project={project}
              projectCount={featuredProjects.length}
              recordRef={(node) => { projectRefs.current[index] = node; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
