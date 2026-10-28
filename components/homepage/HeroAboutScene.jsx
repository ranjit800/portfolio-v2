"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Hero from "./Hero";
import AboutCard from "./AboutCard";

const DESKTOP_QUERY = "(min-width: 1024px)";

export default function HeroAboutScene() {
  const sceneRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [aboutInteractive, setAboutInteractive] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const aboutY = useTransform(
    scrollYProgress,
    [0, 0.08, 0.43, 1],
    ["110%", "110%", "0%", "0%"],
  );
  const cardTop = useTransform(
    scrollYProgress,
    [0, 0.43, 0.87, 1],
    ["2rem", "2rem", "2rem", "0rem"],
  );
  const cardInset = useTransform(
    scrollYProgress,
    [0, 0.43, 0.87, 1],
    ["1.5rem", "1.5rem", "1.5rem", "0rem"],
  );
  const cardRadius = useTransform(
    scrollYProgress,
    [0, 0.43, 0.87, 1],
    ["2rem", "2rem", "2rem", "0rem"],
  );
  const heroFilter = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    ["brightness(1)", "brightness(1)", "brightness(0.86)", "brightness(0.76)"],
  );

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const updateViewport = () => setIsDesktop(media.matches);

    updateViewport();
    media.addEventListener("change", updateViewport);
    return () => media.removeEventListener("change", updateViewport);
  }, []);

  const enableStack = isDesktop && !reduceMotion;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!enableStack) return;
    setAboutInteractive((current) => {
      const next = latest > 0.14;
      return current === next ? current : next;
    });
  });

  return (
    <section
      ref={sceneRef}
      className={`relative bg-[#070a0f] ${enableStack ? "h-[440svh]" : ""}`}
    >
      <div className={enableStack ? "sticky top-0 h-svh overflow-hidden" : ""}>
        <motion.div
          style={enableStack ? { filter: heroFilter } : undefined}
          className={enableStack ? "absolute inset-0" : "relative"}
        >
          <Hero />
        </motion.div>

        <span
          id="about"
          aria-hidden="true"
          className={enableStack ? "absolute top-[calc(100svh-5rem)] block h-px scroll-mt-20" : "block h-px scroll-mt-20"}
        />

        <AboutCard
          scrollProgress={scrollYProgress}
          isInteractive={!enableStack || aboutInteractive}
          enableParallax={enableStack}
          isStacked={enableStack}
          cardStyle={
            enableStack
              ? {
                  top: cardTop,
                  right: cardInset,
                  bottom: cardInset,
                  left: cardInset,
                  y: aboutY,
                  borderRadius: cardRadius,
                }
              : undefined
          }
        />
      </div>
    </section>
  );
}
