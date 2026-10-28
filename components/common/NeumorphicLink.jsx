"use client";

import { motion, useReducedMotion } from "framer-motion";

const linkMotion = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -2.5,
    scale: 1.025,
    transition: { type: "spring", stiffness: 420, damping: 24, mass: 0.55 },
  },
  tap: {
    y: 0,
    scale: 0.97,
    transition: { type: "spring", stiffness: 520, damping: 28, mass: 0.45 },
  },
};

const arrowMotion = {
  rest: { x: 0 },
  hover: { x: 4, transition: { type: "spring", stiffness: 460, damping: 26 } },
  tap: { x: 0 },
};

export default function NeumorphicLink({
  href,
  children,
  className = "",
  onClick,
  tabIndex,
  target,
  rel,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      onClick={onClick}
      tabIndex={tabIndex}
      target={target}
      rel={rel}
      variants={linkMotion}
      initial="rest"
      whileHover={reduceMotion ? "rest" : "hover"}
      whileTap={reduceMotion ? "rest" : "tap"}
      className={`group inline-flex items-center gap-2 rounded-full border border-[#ffba67]/60 bg-[linear-gradient(145deg,#ff9d2e,#ed7600)] font-semibold text-surface shadow-[0.35rem_0.45rem_0.9rem_rgba(0,0,0,0.35),-0.16rem_-0.16rem_0.45rem_rgba(255,202,123,0.22),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(128,53,0,0.24)] transition-[box-shadow,filter] duration-200 hover:brightness-105 hover:shadow-[0_0.7rem_1.35rem_rgba(0,0,0,0.42),0_0_1.2rem_rgba(255,138,0,0.28),inset_0_1px_0_rgba(255,255,255,0.48),inset_0_-2px_4px_rgba(128,53,0,0.2)] active:shadow-[inset_0_0.2rem_0.5rem_rgba(117,47,0,0.28),inset_0_-1px_0_rgba(255,224,179,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${className}`}
    >
      {children}
      <motion.span variants={arrowMotion} aria-hidden="true">
        &rarr;
      </motion.span>
    </motion.a>
  );
}
