// Content data extracted from CV
// Javier Rodríguez Viñas - Lead Frontend Engineer & UX Specialist

export const personal = {
  name: "Javier Rodríguez Viñas.",
  title: "Lead Frontend Engineer",
  subtitle: "With Fullstack & Design expertise",
  tagline: "Bridging design and code",
  email: "javi.vinas.2000@gmail.com",
  phone: "+34 646 418 718",
  location: "Vigo, Spain",
  locationUrl: "https://maps.app.goo.gl/UJeRYwdfmHvyEmwm6",
  social: {
    linkedin: "https://www.linkedin.com/in/javi-rodriguez-vinas/",
    github: "https://github.com/JaviVinnas",
  },
};

export const bio = {
  short: "Software Engineer who understands products from both design and implementation perspectives. 5 years building high-performance interfaces, Design Systems, and digital products that feel as good as they work.",
  full: [
    "I approach products holistically, understanding both the **design intent** and the **technical constraints** that shape great experiences.",
    "5 years specialized in **Frontend** and digital product development, architecting scalable interfaces and complete **Design Systems**.",
    "Strong **Fullstack** foundation (Node.js, Python, AWS) that enables me to make informed decisions across the entire stack.",
    "Obsessed with the details that make products feel polished: motion design, micro-interactions, and the subtle cues that guide users effortlessly.",
    "Currently redefining my workflow with AI-native tools (Cursor, Claude Code) and exploring the architectural patterns for the next wave of software, where asynchronous agentic delegation becomes a core UX component. Also deep-diving into modern frameworks like TanStack Start.",
  ],
};

export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  type: "remote" | "hybrid" | "onsite";
  description: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    role: "Lead Frontend Engineer",
    company: "Sbayt",
    companyUrl: "https://sbayt.ai/es/",
    period: "November 2023 → Present",
    location: "Remote (A Coruña, ES)",
    type: "remote",
    description: "Technical leadership of the frontend for an industrial data analytics platform (steel rolling mills) designed for plant operators and business-side users.",
    highlights: [
      "Built from scratch a Next.js platform interfacing (via REST APIs & WebSockets) with Big Data systems (Spark, Kafka, MinIO) for failure prediction and medium-term self-correction",
      "Implemented real-time observability dashboards, solving the dual challenge of guiding user attention via subtle burst animations and meticulously managing performance to avoid saturating the React main thread. A consistently snappy experience was not an extra, but key for building user trust in the product",
      "Designed and built a complete Design System (inspired by Shopify Polaris) using progressive disclosure: extremely powerful and expressive technical UI that never feels overwhelming",
      "Developed 'physical' animations replicating analog control panels as a design nod to the industrial context this product aims to digitize",
      "Built a type-safe, procedural system for generating complex data tables on demand (sorting, filtering via criteria pattern, pagination). The challenge wasn't just building tables, but enabling anyone (even coding agents) to spin up new ones effortlessly and consistently",
    ],
  },
  {
    role: "Fullstack Engineer",
    company: "Gradiant",
    companyUrl: "https://www.gradiant.org",
    period: "February 2022 → October 2023",
    location: "Hybrid (Vigo, ES)",
    type: "hybrid",
    description: "Fullstack Engineer within the Cybersecurity division, collaborating extensively across both frontend and backend to build secure digital products.",
    highlights: [
      "Spearheaded the development of a Self-Sovereign Identity (SSI) Android application, managing the full vertical from the Kotlin implementation to the creation of a bespoke Design System",
      "Collaborated on both frontend and backend architectures, narrowing the gap between security requirements and user experience",
      "Implemented efficient data anonymization algorithms in Python backends (NumPy, Pandas) for sensitive datasets",
      "Built and optimized security-critical SPAs using React and Vue, and mentored interns to raise the team's code quality standards",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Gradiant",
    companyUrl: "https://www.gradiant.org",
    period: "June 2021 → August 2021",
    location: "Hybrid (Vigo, ES)",
    type: "hybrid",
    description: "Productization of a powerful CLI-based data anonymization system (part of a European Cybersecurity Project) to make it accessible to external users.",
    highlights: [
      "Designed the visual identity and implemented critical workflows in a Vue/TypeScript SPA, transforming a CLI-only tool into a modern web product",
      "Significantly improved usability and visibility, enabling external stakeholders to leverage powerful data anonymization capabilities without technical friction",
    ],
  },
];

export interface Skill {
  name: string;
  url?: string;
}

export interface SkillCategory {
  name: string;
  skills: (string | Skill)[];
  accent?: "blue" | "warm" | "neutral" | "pink" | "cyan" | "emerald" | "violet" | "amber";
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Core",
    skills: [
      { name: "React", url: "https://react.dev" },
      { name: "Next.js", url: "https://nextjs.org" },
      { name: "TypeScript", url: "https://www.typescriptlang.org" },
      { name: "Vue 3", url: "https://vuejs.org" },
      { name: "Astro", url: "https://astro.build" },
      "HTML5",
      "CSS3",
      { name: "Preact", url: "https://preactjs.com" },
    ],
    accent: "blue",
  },
  {
    name: "UI & Styling",
    skills: [
      { name: "Tailwind CSS", url: "https://tailwindcss.com" },
      { name: "Framer Motion", url: "https://motion.dev" },
      { name: "Radix UI", url: "https://www.radix-ui.com" },
      "CSS Modules",
      { name: "Rive", url: "https://rive.app" },
    ],
    accent: "pink",
  },
  {
    name: "State & Data",
    skills: [
      { name: "React Query", url: "https://tanstack.com/query" },
      { name: "Redux", url: "https://redux.js.org" },
      { name: "Vuex", url: "https://vuex.vuejs.org" },
      { name: "Zustand", url: "https://zustand.docs.pmnd.rs" },
      "Axios",
    ],
    accent: "cyan",
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", url: "https://nodejs.org" },
      { name: "Express.js", url: "https://expressjs.com" },
      { name: "Hono.js", url: "https://hono.dev" },
      { name: "Python", url: "https://www.python.org" },
      { name: "Prisma", url: "https://www.prisma.io" },
      { name: "DrizzleORM", url: "https://orm.drizzle.team" },
    ],
    accent: "emerald",
  },
  {
    name: "Databases",
    skills: [
      { name: "PostgreSQL", url: "https://www.postgresql.org" },
      { name: "MongoDB", url: "https://www.mongodb.com" },
      { name: "MinIO", url: "https://min.io" },
    ],
    accent: "violet",
  },
  {
    name: "Infrastructure",
    skills: [
      { name: "AWS", url: "https://aws.amazon.com" },
      { name: "Docker", url: "https://www.docker.com" },
      { name: "GitHub Actions", url: "https://github.com/features/actions" },
      "CI/CD",
    ],
    accent: "warm",
  },
  {
    name: "Design & UX",
    skills: [
      { name: "Figma", url: "https://www.figma.com" },
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Motion Design",
    ],
    accent: "amber",
  },
  {
    name: "Other",
    skills: [
      { name: "Git", url: "https://git-scm.com" },
      "Monorepo Architecture",
      "Browser Internals",
      "Functional Programming",
    ],
    accent: "neutral",
  },
];

export const education = {
  degree: "B.Sc. in Computer Engineering",
  institution: "University of Santiago de Compostela (USC)",
  graduated: "June 2022",
};

export const certifications = [
  {
    name: "AWS Certified Developer",
    status: "In progress",
  },
];

export const languages = [
  { name: "Spanish", level: "Native" },
  { name: "Galician", level: "Native" },
  { name: "English", level: "B1 (Daily professional use)" },
  { name: "French", level: "Elementary (A1 certified)" },
];

export const interests = {
  learning: ["TanStack Start", "AI-powered coding tools (Cursor, Claude Code)", "Motion Design"],
  personal: ["Swimming", "Music", "Graphic Design", "Travel", "Films", "Art"],
};

export interface Project {
  title: string;
  type: string;
  description: string;
  highlights: string[];
  url?: string;
  github?: string;
  isCurrent?: boolean;
}

export const projects: Project[] = [
  {
    title: "Personal Site",
    type: "Digital Identity",
    description: "My personal spot on the web, designed with a focus on typography, motion, and extreme attention to detail.",
    highlights: [
      "Bespoke design system crafted from scratch to establish a unique visual identity for myself as a professional",
      "High-performance architecture built with Astro and Preact for near-instant interactions",
      "Automated SEO optimization and semantic structure for maximum digital discoverability",
    ],
    github: "https://github.com/JaviVinnas/personal-site",
    isCurrent: true,
  },
  {
    title: "Clinical Patient Tracker",
    type: "Technical Showcase",
    description: "Patient management app optimized for perceived performance.",
    highlights: [
      "Implemented Next.js App Router with a composable skeleton strategy: each component exports its own skeleton, making complex loading states incrementally easy to build via standard React composition",
      "Custom design based on shadcn/ui for a functional, modern aesthetic that conveys calm",
    ],
    github: "https://github.com/JaviVinnas/technical-assignment-kannact",
  },
  {
    title: "Time Artifacts",
    type: "Digital Product",
    description: "Gumroad store featuring wall calendars I design and release annually.",
    highlights: [
      "Born from a personal need when I couldn't find a wall calendar that truly resonated with me",
      "Serves as a creative playground to explore typography and visual consistency, free from the constraints of software engineering",
    ],
    url: "https://timeartifacts.gumroad.com",
  },
];


