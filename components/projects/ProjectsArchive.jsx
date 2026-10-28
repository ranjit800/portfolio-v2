"use client";

import { motion, useReducedMotion } from "framer-motion";
import NeumorphicLink from "@/components/common/NeumorphicLink";
import ProjectGallery from "@/components/projects/ProjectGallery";

function ArchiveCard({ project, index, projectCount }) {
  const reduceMotion = useReducedMotion();
  const hasCompanySite = Boolean(project.companyUrl);
  const hasLiveSite = Boolean(project.liveUrl);
  const hasSourceCode = Boolean(project.sourceUrl);

  return (
    <motion.article
      id={project.slug}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : (index % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-32 overflow-hidden rounded-[1.35rem] border border-white/[0.1] bg-white/[0.018] shadow-[0_1.5rem_3.5rem_rgba(0,0,0,0.18)]"
    >
      <div className="border-b border-white/[0.08] bg-[#0d131a]">
        <ProjectGallery project={project} sizes="(max-width: 767px) 100vw, 50vw" />
      </div>

      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[0.65rem] font-semibold tracking-[0.16em] text-[#ff8a00]">{project.number} / {String(projectCount).padStart(2, "0")}</p>
            <h2 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.03em] text-heading sm:text-3xl">{project.title}</h2>
            {project.companyRole && <p className="mt-3 font-mono text-[0.6rem] font-semibold tracking-[0.11em] text-slate-500">{project.companyRole}</p>}
          </div>
          <span className="shrink-0 rounded-full border border-[#ff8a00]/30 bg-[#ff8a00]/[0.08] px-2.5 py-1 text-[0.56rem] font-bold tracking-[0.1em] text-[#ffab4b]">{project.type}</span>
        </div>

        <p className="mt-5 text-sm leading-7 text-subtext">{project.description}</p>
        {project.impact && <p className="mt-4 border-l border-[#ff8a00]/55 pl-4 text-sm leading-6 text-slate-400"><span className="font-mono text-[0.58rem] font-semibold tracking-[0.12em] text-[#ffab4b]">IMPACT&nbsp; </span>{project.impact}</p>}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tool) => <span key={tool} className="rounded-full border border-white/[0.1] bg-black/10 px-3 py-1.5 text-[0.65rem] font-medium text-slate-300">{tool}</span>)}
        </div>

        {(hasCompanySite || hasLiveSite || hasSourceCode) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {hasCompanySite && <NeumorphicLink href={project.companyUrl} target="_blank" rel="noreferrer" className="px-4 py-2 text-xs">{project.companyLabel || "Company Site"}</NeumorphicLink>}
            {hasLiveSite && <NeumorphicLink href={project.liveUrl} target="_blank" rel="noreferrer" className="px-4 py-2 text-xs">Live Site</NeumorphicLink>}
            {hasSourceCode && <NeumorphicLink href={project.sourceUrl} target="_blank" rel="noreferrer" className="px-4 py-2 text-xs">Source Code</NeumorphicLink>}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsArchive({ projects }) {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative isolate overflow-x-clip bg-[#0b0f14] px-5 pt-32 pb-24 sm:px-10 sm:pt-40 sm:pb-32 lg:px-14">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(148,163,184,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.035)_1px,transparent_1px)] [background-size:48px_48px]" />
      <section className="relative mx-auto max-w-[1280px]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-mono text-xs font-semibold tracking-[0.24em] text-[#ff8a00]">PROJECT ARCHIVE</p>
          <h1 className="mt-5 font-display text-5xl font-bold tracking-[-0.045em] text-heading sm:text-7xl">Built to be<br /><span className="text-[#ff8a00]">explored.</span></h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-subtext sm:text-lg">A selection of interfaces, experiments, and full products — each documented through the screens that shaped it.</p>
          <p className="mt-8 font-mono text-[0.65rem] font-semibold tracking-[0.16em] text-slate-500">{String(projects.length).padStart(2, "0")} / COMPLETE ARCHIVE</p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-20 lg:gap-8">
          {projects.map((project, index) => <ArchiveCard key={project.slug} project={project} index={index} projectCount={projects.length} />)}
        </div>
      </section>
    </main>
  );
}
