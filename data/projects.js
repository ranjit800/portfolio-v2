const projectAsset = (project, filename) => `/assets/projects/${project}/${filename}`;

export const projects = [
  {
    slug: "ai-fashion-platform",
    number: "01",
    title: "AI Fashion Platform",
    companyRole: "White Dodo · Full Stack Developer & AI Engineer",
    type: "Professional",
    description:
      "White Dodo's in-house AI fashion platform for virtual try-on, fashion-design assistance, texture editing, and swatch-based tile extraction.",
    impact:
      "Helped increase catalog-imagery production output by ~50% after launch, supporting catalog and virtual try-on workflows for large fashion brands including Myntra and Raymond.",
    stack: ["Grounded SAM", "Gemini API", "OpenAI API", "ControlNet", "DensePose", "Stable Diffusion"],
    images: [
      "admin.png",
      "Screenshot 2026-10-27 155750.png",
      "Screenshot 2026-10-27 155845.png",
      "Screenshot 2026-10-27 160103.png",
      "Screenshot 2026-10-27 160405.png",
    ].map((image) => projectAsset("ai-fashion-studio", image)),
    companyUrl: "https://whitedodo.ai",
    companyLabel: "White Dodo",
  },
  {
    slug: "ai-interview-prep-assistant",
    number: "02",
    title: "AI Interview Prep Assistant",
    type: "Professional",
    description:
      "An intelligent, AI-powered learning platform designed to help users master technical-interview topics through dynamic quizzes, a gamified points system, and JWT-based authentication.",
    stack: ["Next.js", "MongoDB", "Google Gemini API", "JWT Auth"],
    images: [projectAsset("ai-interview-prep", "cover.png")],
    liveUrl: "https://ai-interview-prep-rk35.vercel.app/login",
    sourceUrl: "https://github.com/ranjit800/ai-interview-prep",
  },
  {
    slug: "luxora-realty",
    number: "03",
    title: "Luxora Realty",
    type: "Professional",
    description:
      "A full-featured real-estate listing platform built with the MERN stack. Users can create, edit, and browse listings with Firebase authentication and MongoDB data.",
    stack: ["React", "Node.js", "MongoDB", "Firebase"],
    images: ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png"].map((image) => projectAsset("luxora-realty", image)),
    liveUrl: "https://luxora-realty-real-estate-services.onrender.com",
    sourceUrl: "https://github.com/ranjit800/mern-real-estate",
  },
  {
    slug: "rj-movie-app",
    number: "04",
    title: "RJ Movie App",
    type: "Professional",
    description:
      "A React movie-browsing platform for trending movies, TV shows, and web series with TMDB-powered search, filters, ratings, and trailer viewing.",
    stack: ["React", "TMDB API", "Tailwind CSS"],
    images: ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png"].map((image) => projectAsset("rj-movie-app", image)),
    liveUrl: "https://rj-movie-find-app.onrender.com/",
    sourceUrl: "https://github.com/ranjit800/Rj-movie-app",
  },
  {
    slug: "north-star-metricx",
    number: "05",
    title: "North Star Metricx",
    type: "Work",
    description:
      "A responsive cryptocurrency platform offering real-time market data, a seamless trading experience, and secure API integration with GSAP-powered interface motion.",
    stack: ["Next.js", "GSAP", "WebSockets"],
    images: ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png"].map((image) => projectAsset("north-star-metricx", image)),
  },
  {
    slug: "refokus-clone",
    number: "06",
    title: "Refokus Clone",
    type: "Professional",
    description:
      "A pixel-precise Refokus.com study built with Framer Motion and Locomotive Scroll, featuring an interactive, responsive interface and smooth transitions.",
    stack: ["React", "Framer Motion", "Locomotive Scroll"],
    images: ["refokusclone1.png", "refokusclone2.png", "refokusclone3.png", "refokusclone4.png", "refokusclone5.png"].map((image) => projectAsset("refokus-clone", image)),
    liveUrl: "https://refokus-clone-rj.vercel.app/",
    sourceUrl: "https://github.com/ranjit800/refokus-clone",
  },
  {
    slug: "hth-ture-and-hotel",
    number: "07",
    title: "HTH Ture and Hotel",
    type: "Professional",
    description:
      "A modern hotel-booking website with an elegant responsive interface, room-booking UI, and an interactive gallery.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    images: ["hthimg1.png", "hthimg2.png", "hthimg3.png", "hthimg4.png", "hthimg5.png", "hthimg6.png"].map((image) => projectAsset("hth-ture-and-hotel", image)),
    liveUrl: "https://hth-ture-and-hotel.vercel.app/",
    sourceUrl: "https://github.com/ranjit800/hthTureAndHotel",
  },
  {
    slug: "nakya-lab-management",
    number: "08",
    title: "Nakya Lab Management",
    type: "Personal",
    description:
      "A chemistry lab-management system in active development, focused on experiment tracking, inventory management, and data analysis.",
    stack: ["React", "Redux", "Chart.js"],
    images: ["Labimg1.png", "Labimg2.png", "Labimg3.png", "Labimg4.png", "Labimg5.png", "Labimg6.png"].map((image) => projectAsset("nakya-lab-management", image)),
    sourceUrl: "https://github.com/ranjit800/nakya-lab",
  },
];

export const featuredProjects = projects.slice(0, 5);
