import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import * as simpleIcons from "simple-icons";

const outputDirectory = resolve("public/assets/tool-icons");

const slugify = (name) => name
  .toLowerCase()
  .replaceAll("&", "and")
  .replaceAll("/", "-")
  .replaceAll(".", "")
  .replaceAll("+", "plus")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const brands = {
  JavaScript: "siJavascript",
  TypeScript: "siTypescript",
  Python: "siPython",
  HTML5: "siHtml5",
  CSS3: "siCss",
  React: "siReact",
  "Next.js": "siNextdotjs",
  Redux: "siRedux",
  "Tailwind CSS": "siTailwindcss",
  "Framer Motion": "siFramer",
  GSAP: "siGreensock",
  "Three.js": "siThreedotjs",
  "Node.js": "siNodedotjs",
  "Express.js": "siExpress",
  FastAPI: "siFastapi",
  Django: "siDjango",
  PyTorch: "siPytorch",
  Transformers: "siHuggingface",
  "Hugging Face": "siHuggingface",
  MediaPipe: "siMediapipe",
  OpenCV: "siOpencv",
  NumPy: "siNumpy",
  Pandas: "siPandas",
  "Scikit-learn": "siScikitlearn",
  MongoDB: "siMongodb",
  PostgreSQL: "siPostgresql",
  Docker: "siDocker",
  Git: "siGit",
  Postman: "siPostman",
  "Mapbox GL": "siMapbox",
  Figma: "siFigma",
  "Cursor AI": "siCursor",
  "Model Context Protocol": "siModelcontextprotocol",
};

const conceptFor = {
  Zustand: "state",
  "AR.js": "ar",
  "REST API Design": "api",
  Diffusers: "image",
  "Stable Diffusion": "image",
  ControlNet: "network",
  DensePose: "pose",
  OpenPose: "pose",
  Pillow: "image",
  "LLM Inference": "inference",
  bitsandbytes: "quantization",
  "Float32 / Float16 / BF16": "precision",
  AWS: "cloud",
};

const concepts = {
  state: '<path d="M14 16h12v12H14zM38 16h12v12H38zM26 36h12v12H26z" fill="#ff8a00"/><path d="M26 22h-8m20 0h8M32 28v8" fill="none" stroke="#94a3b8" stroke-linecap="round" stroke-width="4"/>',
  ar: '<path d="m32 10 17 10v20L32 50 15 40V20z" fill="none" stroke="#55d6be" stroke-linejoin="round" stroke-width="4"/><path d="m32 10 17 10-17 10-17-10m17 10v20" fill="none" stroke="#ff8a00" stroke-linejoin="round" stroke-width="4"/>',
  api: '<circle cx="16" cy="32" r="6" fill="#ff8a00"/><circle cx="48" cy="18" r="6" fill="#60a5fa"/><circle cx="48" cy="46" r="6" fill="#a78bfa"/><path d="m22 30 20-9M22 34l20 9" fill="none" stroke="#94a3b8" stroke-linecap="round" stroke-width="4"/>',
  image: '<rect x="10" y="13" width="44" height="38" rx="7" fill="none" stroke="#60a5fa" stroke-width="4"/><circle cx="23" cy="26" r="4" fill="#ff8a00"/><path d="m15 45 12-12 8 8 6-6 8 10" fill="none" stroke="#a78bfa" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>',
  network: '<circle cx="16" cy="32" r="6" fill="#ff8a00"/><circle cx="32" cy="16" r="6" fill="#60a5fa"/><circle cx="48" cy="32" r="6" fill="#a78bfa"/><circle cx="32" cy="48" r="6" fill="#55d6be"/><path d="m20 28 8-8m8 0 8 8m0 8-8 8m-8 0-8-8" fill="none" stroke="#94a3b8" stroke-linecap="round" stroke-width="4"/>',
  pose: '<circle cx="32" cy="13" r="6" fill="#ff8a00"/><path d="M32 20v15m0-8-12 8m12-8 12 8m-12 0-9 14m9-14 9 14" fill="none" stroke="#60a5fa" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>',
  inference: '<path d="M14 18h36v28H14z" fill="none" stroke="#60a5fa" stroke-width="4"/><path d="m22 28 6 5-6 5m12 0h8" fill="none" stroke="#ff8a00" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>',
  quantization: '<path d="M14 17h10v10H14zm13 0h10v10H27zm13 0h10v10H40zM14 37h10v10H14zm13 0h10v10H27zm13 0h10v10H40z" fill="#a78bfa"/><path d="M18 32h28" stroke="#ff8a00" stroke-linecap="round" stroke-width="4"/>',
  precision: '<circle cx="32" cy="32" r="20" fill="none" stroke="#60a5fa" stroke-width="4"/><path d="M32 18v14l9 7" fill="none" stroke="#ff8a00" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/><circle cx="32" cy="32" r="4" fill="#a78bfa"/>',
  cloud: '<path d="M19 45h27a10 10 0 0 0 1-20 15 15 0 0 0-28-3A11 11 0 0 0 19 45Z" fill="none" stroke="#ff9900" stroke-linejoin="round" stroke-width="4"/><path d="M25 35h14" stroke="#60a5fa" stroke-linecap="round" stroke-width="4"/>',
};

function wrap(content, title, viewBox = "0 0 64 64") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-labelledby="title"><title id="title">${title}</title>${content}</svg>`;
}

await mkdir(outputDirectory, { recursive: true });

for (const [name, iconName] of Object.entries(brands)) {
  const icon = simpleIcons[iconName];
  if (!icon) throw new Error(`Missing Simple Icons export: ${iconName}`);
  const svg = wrap(`<path fill="#${icon.hex}" d="${icon.path}"/>`, name, "0 0 24 24");
  await writeFile(resolve(outputDirectory, `${slugify(name)}.svg`), svg);
}

for (const [name, concept] of Object.entries(conceptFor)) {
  const svg = wrap(concepts[concept], name);
  await writeFile(resolve(outputDirectory, `${slugify(name)}.svg`), svg);
}

console.log(`Exported ${Object.keys(brands).length + Object.keys(conceptFor).length} local tool icons.`);
