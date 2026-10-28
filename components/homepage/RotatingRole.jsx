"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ROLES = [
  "Full Stack Developer",
  "Software Engineer",
  "Front-End Developer",
  "Back-End Developer",
  "Coder",
];

const TYPE_DELAY = 55;
const HOLD_DELAY = 1200;
const DELETE_DELAY = 32;
const NEXT_ROLE_DELAY = 220;

export default function RotatingRole() {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [phase, setPhase] = useState("typing");
  const role = ROLES[roleIndex];

  useEffect(() => {
    if (reduceMotion) return undefined;

    let delay = TYPE_DELAY;
    let update = () => setCharacterCount((count) => count + 1);

    if (phase === "typing" && characterCount >= role.length) {
      delay = HOLD_DELAY;
      update = () => setPhase("deleting");
    } else if (phase === "deleting" && characterCount > 0) {
      delay = DELETE_DELAY;
      update = () => setCharacterCount((count) => count - 1);
    } else if (phase === "deleting") {
      delay = NEXT_ROLE_DELAY;
      update = () => {
        setRoleIndex((current) => (current + 1) % ROLES.length);
        setPhase("typing");
      };
    }

    const timer = window.setTimeout(update, delay);
    return () => window.clearTimeout(timer);
  }, [characterCount, phase, reduceMotion, role.length]);

  if (reduceMotion) {
    return <span>Full Stack Developer</span>;
  }

  return (
    <span className="relative block min-h-[1.25em] w-full max-w-[23ch] whitespace-pre" aria-live="off">
      <span className="sr-only">Full Stack Developer, Software Engineer, Front-End Developer, Back-End Developer, and Coder.</span>
      <span aria-hidden="true">{role.slice(0, characterCount)}</span>
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        className="ml-0.5 inline-block h-[0.95em] w-px translate-y-[0.08em] bg-[#718096]"
      />
    </span>
  );
}
