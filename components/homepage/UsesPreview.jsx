"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const CAPABILITIES = {
  languages: {
    number: "01",
    label: "CORE LANGUAGES",
    title: "Foundations",
    description: "The languages behind the interfaces, services, and AI workflows I build.",
    tools: [
      ["JS", "JavaScript", "ES6+ application logic"],
      ["TS", "TypeScript", "Typed JavaScript"],
      ["PY", "Python", "AI and backend work"],
      ["H5", "HTML5", "Semantic structure"],
      ["C3", "CSS3", "Responsive styling"],
    ],
  },
  frontend: {
    number: "02",
    label: "FRONTEND & CREATIVE UI",
    title: "Experiences",
    description: "Component-driven interfaces, stateful product flows, and motion that gives an idea a clear shape.",
    tools: [
      ["R", "React", "Component interfaces"],
      ["N", "Next.js", "Full-stack web apps"],
      ["RX", "Redux", "Predictable state"],
      ["ZU", "Zustand", "Lightweight state"],
      ["TW", "Tailwind CSS", "Design systems"],
      ["FM", "Framer Motion", "Interface motion"],
      ["GS", "GSAP", "Timeline animation"],
      ["3D", "Three.js", "WebGL scenes"],
      ["AR", "AR.js", "Browser AR"],
    ],
  },
  backend: {
    number: "03",
    label: "BACKEND & APIS",
    title: "Systems",
    description: "Application services and API layers that keep useful product experiences connected.",
    tools: [
      ["ND", "Node.js", "Server runtime"],
      ["EX", "Express.js", "Web services"],
      ["FA", "FastAPI", "Python APIs"],
      ["DJ", "Django", "Web framework"],
      ["API", "REST API Design", "Service contracts"],
    ],
  },
  ai: {
    number: "04",
    label: "AI / ML & COMPUTER VISION",
    title: "Intelligence",
    description: "Generative AI, vision pipelines, and practical model integrations for real-world product experiences.",
    tools: [
      ["PT", "PyTorch", "Deep learning"],
      ["TR", "Transformers", "Model architectures"],
      ["HF", "Hugging Face", "Model ecosystem"],
      ["DF", "Diffusers", "Generative pipelines"],
      ["SD", "Stable Diffusion", "Image generation"],
      ["CN", "ControlNet", "Guided generation"],
      ["DP", "DensePose", "Human pose mapping"],
      ["OP", "OpenPose", "Pose estimation"],
      ["MP", "MediaPipe", "Perception workflows"],
      ["CV", "OpenCV", "Computer vision"],
      ["PI", "Pillow", "Image processing"],
      ["NP", "NumPy", "Numerical computing"],
      ["PD", "Pandas", "Data analysis"],
      ["SK", "Scikit-learn", "Machine learning"],
    ],
  },
  llm: {
    number: "05",
    label: "LLM & INFERENCE",
    title: "Reasoning",
    description: "Model inference and deployment-aware choices for efficient AI-assisted product flows.",
    tools: [
      ["LLM", "LLM Inference", "Model responses"],
      ["BNB", "bitsandbytes", "Quantization"],
      ["FP", "Float32 / Float16 / BF16", "Precision formats"],
      ["MCP", "Model Context Protocol", "Tool connections"],
    ],
  },
  cloud: {
    number: "06",
    label: "DATA, CLOUD & DEVOPS",
    title: "Delivery",
    description: "From application data to cloud deployment: systems designed to reach production without losing clarity.",
    tools: [
      ["MG", "MongoDB", "Document data"],
      ["PG", "PostgreSQL", "Relational data"],
      ["AWS", "AWS", "EC2, Lambda, ECS, S3, API Gateway & Amplify"],
      ["DK", "Docker", "Container workflows"],
      ["GT", "Git", "Version control"],
    ],
  },
  workflow: {
    number: "07",
    label: "WORKFLOW & PRODUCT TOOLS",
    title: "Process",
    description: "The practical tools that help move an idea from a rough thought into a working interface.",
    tools: [
      ["PM", "Postman", "API testing"],
      ["MB", "Mapbox GL", "Interactive maps"],
      ["FG", "Figma", "Interface design"],
      ["CA", "Cursor AI", "AI-assisted development"],
    ],
  },
};

const toolIconSrc = (name) => `/assets/tool-icons/${name
  .toLowerCase()
  .replaceAll("&", "and")
  .replaceAll("/", "-")
  .replaceAll(".", "")
  .replaceAll("+", "plus")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "")}.svg`;

const DARK_LOGOS = new Set(["Next.js", "Express.js", "Three.js", "Cursor AI"]);

function ToolCard({ tool, index, reduceMotion }) {
  const [, name, detail] = tool;
  const needsLightSurface = DARK_LOGOS.has(name);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.012 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.35, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
      className="group min-w-0 rounded-xl border border-white/[0.08] bg-[#0b0f14]/75 px-3 py-3.5 transition-colors duration-300 hover:border-[#ff8a00]/50 hover:bg-[#ff8a00]/[0.055] sm:px-4"
    >
      <div className="flex items-center gap-3.5">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border p-1 transition-all duration-300 group-hover:scale-105 group-hover:border-[#ff8a00]/45 ${
          needsLightSurface
            ? "border-white/25 bg-[#f8f9fa] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
            : "border-white/[0.12] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        }`}>
          <Image
            src={toolIconSrc(name)}
            alt={`${name} icon`}
            width={36}
            height={36}
            unoptimized
            className="h-auto w-9 shrink-0 object-contain"
          />
        </span>
        <div className="min-w-0">
          <p className="break-words text-sm font-semibold leading-5 text-[#f8f9fa]">{name}</p>
          <p className="mt-0.5 text-xs leading-5 text-slate-500">{detail}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CapabilityPanel({ capability, featured = false, reverse = false, reduceMotion }) {
  const panelRef = useRef(null);
  const isActive = useInView(panelRef, { amount: 0.25, once: true });
  const entryX = reverse ? 34 : -34;

  return (
    <motion.article
      ref={panelRef}
      initial={reduceMotion ? false : { opacity: 0, x: entryX, y: 18 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-[1.35rem] border border-white/[0.1] bg-[#0b0f14]/65 shadow-[0_1.5rem_4rem_rgba(0,0,0,0.18)] backdrop-blur-sm ${featured ? "p-5 sm:p-8 lg:p-10" : "p-5 sm:p-6"}`}
    >
      <motion.span
        animate={reduceMotion ? { scaleX: 1 } : { scaleX: isActive ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 h-px w-full origin-left bg-linear-to-r from-[#ff8a00] via-[#ff8a00]/35 to-transparent"
      />

      <div className={`grid gap-7 ${featured ? (reverse ? "lg:grid-cols-[minmax(0,1.75fr)_minmax(13rem,0.75fr)] lg:gap-10" : "lg:grid-cols-[minmax(13rem,0.75fr)_minmax(0,1.75fr)] lg:gap-10") : ""}`}>
        <div className={reverse && featured ? "lg:order-2 lg:text-right" : ""}>
          <div className={`flex items-center gap-3 ${reverse && featured ? "lg:justify-end" : ""}`}>
            <span className="font-mono text-xs font-semibold tracking-[0.16em] text-[#ff8a00]">{capability.number}</span>
            <p className="font-mono text-[0.6rem] font-semibold tracking-[0.14em] text-slate-500">{capability.label}</p>
          </div>
          <h3 className={`mt-5 font-display text-4xl font-bold leading-none tracking-[-0.04em] text-[#f8f9fa] sm:text-5xl ${featured ? "lg:text-[2.5rem] xl:text-5xl 2xl:text-6xl" : ""}`}>{capability.title}<span className="text-[#ff8a00]">.</span></h3>
          <p className={`mt-4 max-w-sm text-sm leading-6 text-[#a0aec0] ${reverse && featured ? "lg:ml-auto" : ""}`}>{capability.description}</p>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
          className={`grid gap-2.5 ${featured ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2"} ${reverse && featured ? "lg:order-1" : ""}`}
        >
          {capability.tools.map((tool, index) => <ToolCard key={tool[1]} tool={tool} index={index} reduceMotion={reduceMotion} />)}
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function UsesPreview() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const toolsY = useTransform(scrollYProgress, [0, 1], [72, -72]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-34, 74]);

  return (
    <section ref={sectionRef} id="uses" className="relative isolate overflow-x-clip scroll-mt-20 border-t border-white/[0.08] bg-[#070a0f] px-6 py-24 sm:px-10 sm:py-32 lg:px-14 lg:py-40">
      <motion.p
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: toolsY }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 whitespace-nowrap font-display text-[27vw] font-bold leading-none tracking-[-0.06em] text-white/[0.025]"
      >
        TOOLS
      </motion.p>
      <motion.div aria-hidden="true" style={reduceMotion ? undefined : { y: glowY }} className="pointer-events-none absolute right-[8%] top-[18%] -z-10 h-72 w-72 rounded-full bg-[#ff8a00]/[0.07] blur-[110px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(148,163,184,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.035)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-[1280px]">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-xs font-semibold tracking-[0.22em] text-[#ff8a00]">USES / FULL STACK &amp; AI</p>
          <h2 className="mt-5 font-display text-5xl font-bold tracking-[-0.045em] text-[#f8f9fa] sm:text-6xl lg:text-7xl">From interfaces to<br className="hidden sm:block" /> intelligent systems<span className="text-[#ff8a00]">.</span></h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#a0aec0]">A practical full-stack and AI toolkit for building clear interfaces, connected services, and production-ready intelligent experiences.</p>
        </motion.header>

        <div className="mt-16 space-y-5 sm:mt-20 sm:space-y-6">
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            <CapabilityPanel capability={CAPABILITIES.languages} reduceMotion={reduceMotion} />
            <CapabilityPanel capability={CAPABILITIES.backend} reverse reduceMotion={reduceMotion} />
          </div>
          <CapabilityPanel capability={CAPABILITIES.frontend} featured reduceMotion={reduceMotion} />
          <CapabilityPanel capability={CAPABILITIES.ai} featured reverse reduceMotion={reduceMotion} />
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
            <CapabilityPanel capability={CAPABILITIES.llm} reduceMotion={reduceMotion} />
            <CapabilityPanel capability={CAPABILITIES.workflow} reverse reduceMotion={reduceMotion} />
          </div>
          <CapabilityPanel capability={CAPABILITIES.cloud} featured reduceMotion={reduceMotion} />
        </div>
      </div>
    </section>
  );
}
