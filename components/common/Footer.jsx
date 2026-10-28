"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { SOCIAL_LINKS } from "./social-links";

const NAVIGATION = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects", href: "/projects" },
  { label: "Uses", id: "uses" },
  { label: "Contact", id: "contact", href: "/contact" },
];
const CREATIONS = [
  { label: "AI Fashion Platform", href: "/projects#ai-fashion-platform" },
  { label: "AI Interview Prep", href: "/projects#ai-interview-prep-assistant" },
  { label: "Luxora Realty", href: "/projects#luxora-realty" },
];
const AVAILABLE_FOR = [
  "Web experiences",
  "Product interfaces",
  "Thoughtful collaboration",
];

const column = {
  hidden: { opacity: 0, y: 18 },
  visible: (reduced) => ({
    opacity: 1,
    y: 0,
    transition: reduced
      ? { duration: 0 }
      : { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FooterColumn({ title, children, index, reducedMotion }) {
  return (
    <motion.div
      custom={reducedMotion}
      variants={column}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: reducedMotion ? 0 : index * 0.07 }}
    >
      <h2 className="font-mono text-[0.62rem] font-semibold tracking-[0.16em] text-[#f8f9fa]">
        {title}
      </h2>
      {children}
    </motion.div>
  );
}

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const getLinkHref = (item) => item.href || (pathname === "/" ? `#${item.id}` : `/#${item.id}`);

  return (
    <footer className="relative isolate overflow-x-clip border-t border-white/[0.09] bg-[#090c10] pt-0 text-subtext">
      <div
        aria-hidden="true"
        className="h-8 border-y border-white/[0.08] bg-[repeating-linear-gradient(135deg,transparent_0,transparent_4px,rgba(148,163,184,0.16)_4px,rgba(148,163,184,0.16)_5px)] sm:h-10"
      />

      <div className="container relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.72fr_0.95fr_1.12fr_1.05fr] lg:gap-x-8 xl:gap-x-12">
          <motion.div
            custom={reduceMotion}
            variants={column}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="max-w-xs sm:col-span-2 lg:col-span-1"
          >
            <Image
              src="/rjlogo.PNG"
              alt="RJ logo"
              width={1291}
              height={1218}
              className="h-10 w-auto object-contain"
            />
            <p className="mt-7 text-sm leading-6 text-[#a0aec0]">
              Building thoughtful web experiences, one considered detail at a time.
            </p>
            <p className="mt-6 text-xs text-slate-500">© 2026 Ranjit Jana. All rights reserved.</p>
          </motion.div>

          <FooterColumn title="NAVIGATE" index={1} reducedMotion={reduceMotion}>
            <nav aria-label="Footer navigation" className="mt-5 flex flex-col items-start gap-3">
              {NAVIGATION.map((item) => (
                <a
                  key={item.id}
                  href={getLinkHref(item)}
                  className="group inline-flex items-center gap-2 text-sm text-slate-400 outline-none transition-colors hover:text-[#ff8a00] focus-visible:text-[#ff8a00]"
                >
                  <span className="h-px w-0 bg-[#ff8a00] transition-all duration-300 group-hover:w-3 group-focus-visible:w-3" />
                  {item.label}
                </a>
              ))}
            </nav>
          </FooterColumn>

          <FooterColumn title="CREATIONS" index={2} reducedMotion={reduceMotion}>
            <ul className="mt-5 space-y-3">
              {CREATIONS.map((creation) => (
                <li key={creation.label} className="flex items-center justify-between gap-3 text-sm text-slate-400">
                  <a href={creation.href} className="transition-colors hover:text-[#ff8a00] focus-visible:text-[#ff8a00]">{creation.label}</a>
                  <span className="font-mono text-[0.54rem] tracking-[0.12em] text-[#ff8a00]/80">FEATURED</span>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="CONNECT" index={3} reducedMotion={reduceMotion}>
            <ul className="mt-5 space-y-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noreferrer" : undefined}
                    className="group inline-flex max-w-full items-center gap-2 text-sm text-slate-400 outline-none transition-colors hover:text-[#ff8a00] focus-visible:text-[#ff8a00]"
                  >
                    <span className="h-px w-0 shrink-0 bg-[#ff8a00] transition-all duration-300 group-hover:w-3 group-focus-visible:w-3" />
                    <span className="truncate">{social.name === "Email" ? "rjranjit099@gmail.com" : social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="AVAILABLE FOR" index={4} reducedMotion={reduceMotion}>
            <ul className="mt-5 space-y-3 text-sm leading-5 text-slate-400">
              {AVAILABLE_FOR.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </FooterColumn>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none relative z-0 -mb-[0.11em] select-none whitespace-nowrap px-3 text-center font-display text-[15vw] font-bold leading-none tracking-[-0.06em] text-white/[0.035] sm:px-6 lg:text-[12.3vw]"
      >
        BUILD WITH INTENT.
      </p>
    </footer>
  );
}
