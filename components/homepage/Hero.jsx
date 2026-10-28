"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/components/common/social-links";
import RotatingRole from "./RotatingRole";

const contentContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-20 bg-[#070a0f] px-3 pt-3 pb-3 sm:px-5 sm:pt-5 sm:pb-5 lg:px-6 lg:pt-8 lg:pb-6 xl:px-8">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface shadow-[0_1.5rem_4rem_rgba(0,0,0,0.28)] lg:min-h-[calc(100svh-3.5rem)] lg:rounded-[2rem]">
        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0">
          <Image src="/asset/images/HeroBg.png" alt="" fill priority sizes="100vw" className="object-cover object-center lg:object-[74%_29%]" />
        </div>

        {/* Dark overlay: top-to-bottom on mobile (nav/text legible up top),
          left-to-right on desktop (text side dark, image side clear) */}
        <div className="absolute inset-0 z-10 bg-linear-to-b from-surface via-surface/70 to-surface/20 lg:bg-linear-to-r lg:from-surface lg:via-surface/75 lg:to-transparent" />
        {/* Extra top scrim so the navbar stays legible regardless of x-position */}
        <div className="absolute inset-x-0 top-0 z-10 h-32 bg-linear-to-b from-surface via-surface to-transparent lg:h-40" />

        {/* Desktop-only avatar, absolutely positioned relative to the full-bleed
          section (not the centered `.container`) so its horizontal anchor can
          match the background image's object-position exactly — that's what
          keeps it centered on the sun at every desktop width. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="pointer-events-none absolute bottom-0 left-[74%] z-20 hidden h-[92%] w-[46%] -translate-x-1/2 lg:block"
        >
          <Image src="/asset/images/my-avtar.png" alt="Ranjit Jana portrait" fill priority sizes="46vw" className="object-contain object-bottom grayscale" />
        </motion.div>

        {/* Caption over the image, desktop only */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute right-10 top-28 z-20 hidden max-w-36 text-right text-sm italic leading-snug text-heading lg:block"
        >
          Better Code
          <br />
          Brighter Tomorrow
          <span className="mt-1 block h-0.5 w-16 bg-accent" />
        </motion.p>

        {/* Foreground text content stays in the centered container */}
        <div className="container relative z-30 flex w-full flex-col lg:min-h-[calc(100svh-3.5rem)]">
          <motion.div
            variants={contentContainer}
            initial="hidden"
            animate="show"
            className="flex flex-1 flex-col items-start gap-5 pt-24 pb-8 lg:max-w-xl lg:justify-center lg:pt-0 lg:pb-0"
          >
            <motion.p variants={item} className="text-sm font-semibold tracking-widest text-accent">
              HI, I&apos;M
            </motion.p>

            <motion.h1 variants={item} className="font-display text-4xl font-bold leading-tight tracking-[-0.035em] text-heading sm:text-5xl lg:text-6xl">
              RANJIT <span className="text-accent">JANA</span>
              <span className="mt-1 block min-h-[1.35em] font-sans text-2xl font-semibold tracking-normal text-subtext sm:text-3xl">
                <RotatingRole />
              </span>
            </motion.h1>

            <motion.p variants={item} className="max-w-md text-base leading-relaxed text-subtext sm:text-lg">
              You bring the idea.<br />
              I&apos;ll bring the code,<br />
              the animations,<br />
              the APIs,<br />
              and an unhealthy relationship with <code>console.log()</code>.

React, Next.js, Node.js
and everything in between.
 </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-surface transition-transform hover:scale-105"
              >
                View My Work
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href="/assets/cv/resume-ranjit-jana.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-heading transition-colors hover:border-accent hover:text-accent"
              >
                View CV
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 3h7v7M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
                </svg>
              </a>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-4 pt-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noreferrer" : undefined}
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-subtext transition-colors hover:border-accent hover:text-accent"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </motion.div>

            <motion.div variants={item} className="hidden items-center gap-3 pt-8 text-xs font-medium tracking-widest text-subtext lg:flex">
              <motion.span
                aria-hidden="true"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="block h-8 w-px bg-subtext/40"
              />
              SCROLL DOWN
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile/tablet-only avatar, in normal document flow below the text so
          it can never overlap the copy above it regardless of text length —
          unlike the desktop version, this isn't absolutely positioned. */}
        <div className="relative z-20 mt-0 pb-0 lg:hidden">
          <div className="relative mx-auto h-72 w-[92%] sm:h-96 sm:w-[80%]">
            <Image src="/asset/images/my-avtar.png" alt="Ranjit Jana portrait" fill sizes="92vw" className="object-contain object-bottom grayscale" />
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute right-0 top-2 max-w-32 text-right text-sm italic leading-snug text-heading"
            >
              Better Code
              <br />
              Brighter Tomorrow
              <span className="mt-1 block h-0.5 w-16 bg-accent" />
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
