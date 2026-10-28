"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";

const Lottie = dynamic(
  () => import("lottie-react").then(({ Lottie: LottiePlayer }) => LottiePlayer),
  { ssr: false },
);

const STORY_BEATS = [
  {
    range: [0.18, 0.49],
    lines: [
      [{ text: "It usually starts with a simple message:" }],
      [{ text: "“Hey, can we get this done by EOD?”", strong: true }],
      [{ text: "Sure.", accent: true }],
    ],
  },
  {
    range: [0.5, 0.55],
    lines: [
      [{ text: "Then comes the next one:" }],
      [{ text: "“Just change the button color.”", strong: true }],
      [{ text: "Easy.", accent: true }],
    ],
  },
  {
    range: [0.56, 0.62],
    lines: [
      [{ text: "Then—" }],
      [{ text: "“Make it bigger.”" }],
      [{ text: "“Actually, make it smaller.”" }],
      [{ text: "“Can we try orange?”", accent: true }],
      [{ text: "And suddenly, it’s 6 PM.", strong: true }],
    ],
  },
  {
    range: [0.63, 0.69],
    compact: true,
    lines: [
      [{ text: "Somewhere between a React component," }],
      [{ text: "a stubborn API, a PostgreSQL query," }],
      [{ text: "and a CORS error that absolutely makes no sense…" }],
      [{ text: "I’m still here.", strong: true }],
    ],
  },
  {
    range: [0.7, 0.76],
    compact: true,
    lines: [
      [{ text: "I’ve learned to deal with race conditions, authentication," }],
      [{ text: "async operations, API architecture, performance optimization," }],
      [{ text: "cloud deployments, and those bugs that disappear" }],
      [{ text: "the moment you open DevTools.", strong: true }],
    ],
  },
  {
    range: [0.77, 0.84],
    compact: true,
    lines: [
      [{ text: "But somewhere along the way, I realized development" }],
      [{ text: "isn’t really about writing code." }],
      [{ text: "It’s about taking " }, { text: "“Can we build this?”", strong: true }],
      [{ text: "and turning it into " }, { text: "“Here it is.”", strong: true }],
      [{ text: "Making complicated systems feel simple." }],
      [{ text: "Making interfaces feel natural." }],
      [{ text: "And sometimes—making the button orange.", accent: true }],
    ],
  },
  {
    range: [0.85, 0.91],
    final: true,
    lines: [
      [{ text: "I’m Ranjit.", strong: true }],
      [{ text: "I build things for the web." }],
      [{ text: "And yes…" }],
      [{ text: "I can probably get it done by EOD.", accent: true, strong: true }],
    ],
  },
];

function positionCatForPeek(animation) {
  const positionedAnimation = structuredClone(animation);
  const entryTrack = positionedAnimation.layers?.find((layer) => layer.nm === "Nul 1")?.ks?.p?.k;

  if (Array.isArray(entryTrack)) {
    entryTrack.forEach((frame, index) => {
      if (Array.isArray(frame.s)) frame.s[1] = index === 0 ? 2500 : 1400;
    });
  }

  return positionedAnimation;
}

function StoryText({ beat, lineClassName }) {
  return beat.lines.map((line, lineIndex) => (
    <p key={`${beat.range[0]}-${lineIndex}`} className={lineClassName}>
      {line.map((segment, segmentIndex) => {
        const className = segment.accent
          ? "text-accent"
          : segment.strong
            ? "font-bold text-heading"
            : "text-subtext";

        return (
          <span key={`${segment.text}-${segmentIndex}`} className={className}>
            {segment.text}
          </span>
        );
      })}
    </p>
  ));
}

function DesktopStoryLine({ line, index, total, progress, start, end, final }) {
  const lineStart = start + ((end - start) * (index + 0.5)) / (total + 1);
  const lineEnd = Math.min(end, lineStart + (end - start) * 0.42);
  const opacity = useTransform(
    progress,
    final
      ? [start - 0.012, lineStart, lineEnd, 1]
      : [start - 0.012, lineStart, lineEnd, end, end + 0.024],
    final ? [0, 0, 1, 1] : [0, 0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    final ? [lineStart, lineEnd, 1] : [lineStart, lineEnd],
    final ? [18, 0, 0] : [18, 0],
  );

  return (
    <motion.p
      style={{ opacity, y }}
      className={`font-display font-medium leading-[1.18] tracking-[-0.025em] ${
        final ? "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl" : "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"
      }`}
    >
      {line.map((segment, segmentIndex) => {
        const className = segment.accent
          ? "text-accent"
          : segment.strong
            ? "font-bold text-heading"
            : "text-subtext";

        return (
          <span key={`${segment.text}-${segmentIndex}`} className={className}>
            {segment.text}
          </span>
        );
      })}
    </motion.p>
  );
}

function DesktopStoryBeat({ beat, progress }) {
  const [start, end] = beat.range;
  const opacity = useTransform(
    progress,
    beat.final ? [start - 0.018, start, 1] : [start - 0.018, start, end, end + 0.028],
    beat.final ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    beat.final ? [start - 0.018, start, 1] : [start - 0.018, start, end, end + 0.028],
    beat.final ? [28, 0, 0] : [28, 0, 0, -20],
  );

  return (
    <motion.article
      style={{ opacity, y }}
      className={`absolute inset-0 mx-auto flex w-full items-center justify-center px-10 text-center ${
        beat.compact ? "max-w-5xl" : beat.final ? "max-w-6xl" : "max-w-4xl"
      }`}
    >
      <div className="flex w-full flex-col gap-3 sm:gap-4 lg:gap-5">
        {beat.lines.map((line, index) => (
          <DesktopStoryLine
            key={`${beat.range[0]}-${index}`}
            line={line}
            index={index}
            total={beat.lines.length}
            progress={progress}
            start={start}
            end={end}
            final={beat.final}
          />
        ))}
      </div>
    </motion.article>
  );
}

function PeekingCat({ shouldPlay, reduceMotion }) {
  const catRef = useRef(null);
  const lottieRef = useRef(null);
  const isInView = useInView(catRef, { amount: 0.2 });
  const shouldRender = reduceMotion || isInView;
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    if (!shouldRender || animationData) return;

    let cancelled = false;

    fetch("/lottie/Orange%20Cat%20Peeping.json")
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) setAnimationData(positionCatForPeek(data));
      })
      .catch(() => {
        // Decorative animation: the section stays complete without it.
      });

    return () => {
      cancelled = true;
    };
  }, [animationData, shouldRender]);

  useEffect(() => {
    if (!lottieRef.current || !animationData) return;

    if (reduceMotion) {
      lottieRef.current.stop();
    } else if (shouldPlay) {
      lottieRef.current.play();
    } else {
      lottieRef.current.pause();
    }
  }, [animationData, reduceMotion, shouldPlay, shouldRender]);

  return (
    <div
      ref={catRef}
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-28 right-2 z-20 h-64 w-44 drop-shadow-[0_-0.8rem_1.5rem_rgba(0,0,0,0.55)] sm:-bottom-32 sm:right-5 sm:h-72 sm:w-48 lg:-bottom-36 lg:right-[5%] lg:h-96 lg:w-60"
    >
      {shouldRender && animationData ? (
        <Lottie
          src={animationData}
          autoplay={false}
          loop={!reduceMotion}
          lottieRef={lottieRef}
          rendererSettings={{ preserveAspectRatio: "xMidYMax meet" }}
        />
      ) : null}
    </div>
  );
}

export default function AboutCard({
  scrollProgress,
  isInteractive,
  enableParallax,
  isStacked,
  cardStyle,
}) {
  const reduceMotion = useReducedMotion();
  const [catActive, setCatActive] = useState(false);
  const catOpacity = useTransform(
    scrollProgress,
    [0, 0.49, 0.53, 0.81, 0.86, 1],
    [0, 0, 1, 1, 0, 0],
  );
  const titleOpacity = useTransform(scrollProgress, [0.1, 0.2], [0, 1]);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    if (!enableParallax || reduceMotion) return;
    const next = latest >= 0.49 && latest <= 0.85;
    setCatActive((current) => (current === next ? current : next));
  });

  const isAnimated = enableParallax && !reduceMotion;

  return (
    <motion.section
      id={!isStacked ? "about" : undefined}
      aria-labelledby="persona-title"
      style={cardStyle}
      className={`${isStacked ? "absolute z-20" : "relative z-10"} isolate flex min-h-[42rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#050607] py-20 shadow-[0_1.5rem_4rem_rgba(0,0,0,0.36)] sm:min-h-[46rem] sm:py-24 lg:min-h-0 lg:items-center lg:rounded-[2rem] lg:py-0 ${
        isInteractive ? "" : "lg:pointer-events-none"
      }`}
    >
      <div aria-hidden="true" className="persona-stars absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[#050607] via-[#050607]/70 to-transparent" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.025] blur-3xl" />

      <motion.div
        style={isAnimated ? { opacity: titleOpacity } : undefined}
        className="absolute left-6 top-7 z-10 sm:left-10 sm:top-9 lg:left-12 lg:top-10"
      >
        <p className="text-xs font-semibold tracking-[0.24em] text-accent">ABOUT</p>
        <h2 id="persona-title" className="mt-2 font-display text-xl font-bold tracking-[-0.03em] text-heading sm:text-2xl">
          Persona<span className="text-accent">.</span>
        </h2>
      </motion.div>

      <div className="relative z-10 hidden min-h-[100svh] w-full lg:block">
        {STORY_BEATS.map((beat) => (
          <DesktopStoryBeat key={beat.range[0]} beat={beat} progress={scrollProgress} />
        ))}
      </div>

      <div className="container relative z-10 flex flex-col gap-16 pb-48 pt-16 sm:gap-20 sm:pb-56 sm:pt-24 lg:hidden">
        {STORY_BEATS.map((beat) => (
          <motion.article
            key={beat.range[0]}
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`mx-auto w-full text-center ${beat.compact ? "max-w-2xl" : "max-w-xl"}`}
          >
            <div className={`flex flex-col gap-3 font-display font-medium leading-[1.3] tracking-[-0.025em] ${beat.final ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>
              <StoryText beat={beat} lineClassName="text-balance" />
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div style={isAnimated ? { opacity: catOpacity } : undefined} className="absolute inset-0 z-20">
        <PeekingCat shouldPlay={!enableParallax || catActive} reduceMotion={reduceMotion} />
      </motion.div>
    </motion.section>
  );
}
