"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import NeumorphicLink from "./NeumorphicLink";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects", href: "/projects" },
  { label: "Uses", id: "uses" },
  { label: "Contact", id: "contact", href: "/contact" },
];
const HERO_SCROLL_THRESHOLD = 28;

const navContainer = {
  hidden: { opacity: 0, y: -16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const overlay = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const drawer = {
  hidden: { opacity: 0.8, x: "100%" },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
  },
  exit: {
    opacity: 0.8,
    x: "100%",
    transition: { duration: 0.24, ease: "easeInOut" },
  },
};

const drawerLinks = {
  hidden: {},
  show: { transition: { delayChildren: 0.16, staggerChildren: 0.075 } },
};

const drawerLink = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.32, ease: "easeOut" } },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navMode, setNavMode] = useState("hero");
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const previousScrollY = useRef(0);
  const getLinkHref = (link) => link.href || (pathname === "/" ? `#${link.id}` : `/#${link.id}`);
  const isActiveLink = (link) => link.href ? pathname === link.href : pathname === "/" && link.id === "home";

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrollDelta = latest - previousScrollY.current;

    if (latest <= HERO_SCROLL_THRESHOLD) {
      setNavMode("hero");
    } else if (scrollDelta > 2) {
      setNavMode("compact");
    } else if (scrollDelta < -2) {
      setNavMode("expanded");
    }

    previousScrollY.current = latest;
  });

  return (
    <>
      <motion.header
        variants={navContainer}
        initial="hidden"
        animate="show"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 lg:top-8"
      >
        <div className="container relative max-lg:px-8">
          <AnimatePresence initial={false}>
            {navMode === "hero" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.16 } }}
                className="hidden items-center justify-between pt-6 lg:flex"
              >
                <Image
                  src="/rjlogo.PNG"
                  alt="RJ logo"
                  width={1291}
                  height={1218}
                  priority
                  className="h-8 w-auto object-contain"
                />
                <NeumorphicLink
                  href="/contact"
                  className="pointer-events-auto px-5 py-2.5 text-sm"
                >
                  Let&apos;s Talk
                </NeumorphicLink>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false} mode="wait">
            {navMode === "hero" ? (
              <motion.nav
                key="hero-notch"
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="pointer-events-auto absolute top-3 left-1/2 hidden -translate-x-1/2 items-center gap-8 rounded-full border border-white/15 bg-black/35 px-9 py-3.5 shadow-[0_1rem_2.5rem_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl lg:flex"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={getLinkHref(link)}
                    className={`text-sm font-medium transition-colors hover:text-accent ${
                      isActiveLink(link) ? "text-heading" : "text-subtext"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </motion.nav>
            ) : (
              <motion.nav
                key="dynamic-island"
                layout
                initial={{ opacity: 0, y: -8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 360, damping: 30 }}
                className={`pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-white/15 bg-black/35 px-2 py-2 shadow-[0_1rem_2.5rem_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl lg:flex ${
                  navMode === "compact" ? "top-2" : "top-0"
                }`}
              >
                <motion.div layout className="flex items-center gap-3">
                  <Image
                    src="/rjlogo.PNG"
                    alt="RJ logo"
                    width={1291}
                    height={1218}
                    className="ml-1 h-7 w-auto object-contain"
                  />
                  <span aria-hidden="true" className="h-5 w-px bg-white/15" />
                  <AnimatePresence initial={false}>
                    {navMode === "expanded" && (
                      <motion.div
                        key="island-links"
                        initial={{ opacity: 0, scaleX: 0.72 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0.72 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex origin-center items-center gap-6"
                      >
                        {NAV_LINKS.map((link) => (
                          <a
                            key={link.id}
                            href={getLinkHref(link)}
                            className={`text-sm font-medium transition-colors hover:text-accent ${
                              isActiveLink(link) ? "text-heading" : "text-subtext"
                            }`}
                          >
                            {link.label}
                          </a>
                        ))}
                        <span aria-hidden="true" className="h-5 w-px bg-white/15" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <NeumorphicLink href="/contact" className="px-4 py-2 text-xs">
                    Let&apos;s Talk
                  </NeumorphicLink>
                </motion.div>
              </motion.nav>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between pt-4 lg:hidden">
            <Image
              src="/rjlogo.PNG"
              alt="RJ logo"
              width={1291}
              height={1218}
              priority
              className="h-8 w-auto object-contain"
            />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="pointer-events-auto relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-heading"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile nav overlay — covers the entire viewport
          regardless of what page content sits behind it, so it never
          lets page content bleed through below the link list */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={overlay}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={() => setMenuOpen(false)}
            className="pointer-events-auto fixed inset-0 z-40 bg-black/55 backdrop-blur-sm lg:hidden"
          >
            <motion.aside
              variants={drawer}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={(event) => event.stopPropagation()}
              aria-label="Mobile navigation"
              className="absolute top-0 right-0 flex h-full w-[min(86vw,24rem)] flex-col border-l border-white/10 bg-surface px-8 pt-28 pb-10 shadow-[-1.5rem_0_4rem_rgba(0,0,0,0.3)]"
            >
              <p className="text-xs font-semibold tracking-[0.24em] text-accent">
                NAVIGATION
              </p>
              <motion.nav
                variants={drawerLinks}
                initial="hidden"
                animate="show"
                className="mt-10 flex flex-col gap-2"
              >
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.id}
                    variants={drawerLink}
                    href={getLinkHref(link)}
                    onClick={() => setMenuOpen(false)}
                    className={`border-b border-white/10 py-4 text-3xl font-semibold transition-colors hover:text-accent ${
                      isActiveLink(link) ? "text-heading" : "text-subtext"
                    }`}
                  >
                    <span className="mr-3 text-sm text-accent/70">0{index + 1}</span>
                    {link.label}
                  </motion.a>
                ))}
                <motion.div variants={drawerLink} className="mt-8 w-fit">
                  <NeumorphicLink
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="px-6 py-3 text-sm"
                  >
                    Let&apos;s Talk
                  </NeumorphicLink>
                </motion.div>
              </motion.nav>
              <motion.p
                variants={drawerLink}
                initial="hidden"
                animate="show"
                className="mt-auto text-sm leading-relaxed text-subtext"
              >
                Let&apos;s build something remarkable together.
              </motion.p>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
