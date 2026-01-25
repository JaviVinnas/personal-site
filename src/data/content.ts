// Content data extracted from CV
// Javier Rodríguez Viñas - Lead Frontend Engineer & UX Specialist

export const personal = {
  name: "Javier Rodríguez Viñas",
  title: "Lead Frontend Engineer",
  subtitle: "Fullstack Engineer & UX Specialist",
  tagline: "Bridging design and code",
  email: "javi.vinas.2000@gmail.com",
  phone: "+34 646 418 718",
  location: "Vigo, Spain",
  locationUrl: "https://maps.app.goo.gl/UJeRYwdfmHvyEmwm6",
  social: {
    linkedin: "https://www.linkedin.com/in/javi-rodriguez-viñas",
    github: "https://github.com/JaviVinnas",
  },
};

export const bio = {
  short: "Software Engineer with 5 years of experience, specialized in Frontend and digital product development. Expert in bridging design and code, architecting scalable, high-performance interfaces and Design Systems.",
  full: [
    "Software Engineer with 5 years of experience, specialized in **Frontend** and digital product development.",
    "Expert in **bridging design and code**, architecting scalable, high-performance interfaces and **Design Systems**.",
    "Solid **Fullstack** foundation (Node.js, Python, AWS) enabling a holistic view of development.",
    "Passionate about building products that are not only technically robust but also intuitive and enjoyable for users.",
    "Currently exploring applied AI in development and modern architectures (TanStack Start).",
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
    companyUrl: "https://sbayt.com",
    period: "November 2023 – Present",
    location: "Remote (A Coruña, ES)",
    type: "remote",
    description: "Technical leadership of the frontend for an industrial data analytics platform (steel rolling mills) designed for plant operators and business-side users.",
    highlights: [
      "Built from scratch a Next.js-based web platform connected to Big Data systems (Spark, Kafka, MinIO) for failure prediction",
      "Implemented mission-critical real-time observability dashboards prioritizing stability and performance via React Query and SSR/caching optimizations",
      "Designed in Figma and implemented an extensive custom design system (inspired by Shopify Polaris, built on shadcn/ui) using Radix UI and Tailwind CSS",
      "Developed advanced micro-interactions and \"physical\" animations (replicating analog indicators) with Framer Motion and CSS",
      "Defined CI/CD pipelines on AWS (GitHub Actions), testing strategies and long-term technical roadmap for the frontend",
    ],
  },
  {
    role: "Fullstack Engineer",
    company: "Gradiant",
    companyUrl: "https://www.gradiant.org",
    period: "February 2022 – October 2023",
    location: "Hybrid (Vigo, ES)",
    type: "hybrid",
    description: "Versatile role in the security division, spanning cryptography to mobile development.",
    highlights: [
      "Implemented efficient data anonymization algorithms in Python (NumPy, Pandas)",
      "Designed and developed a design system for an Android sovereign identity (SSI) app in Kotlin",
      "Built and optimized security SPAs using React and Vue (Redux, Vuex, Webpack)",
      "Mentored interns on frontend best practices, raising the team's code quality",
    ],
  },
  {
    role: "Frontend Developer (Intern)",
    company: "Gradiant",
    companyUrl: "https://www.gradiant.org",
    period: "June 2021 – August 2021",
    location: "Hybrid (Vigo, ES)",
    type: "hybrid",
    description: "Frontend development for a data anonymization service (European Project Infinitech).",
    highlights: [
      "Designed and developed the frontend for a data anonymization service",
      "Built a Vue and TypeScript SPA, significantly improving UX over the previous command-line solution",
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
      "HTML5",
      "CSS3",
      { name: "Astro", url: "https://astro.build" },
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

export interface Project {
  title: string;
  type: string;
  description: string;
  highlights: string[];
  url?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    title: "Clinical Patient Tracker",
    type: "Technical Showcase",
    description: "Patient management app optimized for perceived performance.",
    highlights: [
      "Implemented Next.js App Router with SSR and loading skeletons to avoid layout shifts",
      "Custom design based on shadcn/ui for a functional, modern aesthetic that conveys calm",
    ],
    github: "https://github.com/JaviVinnas/technical-assignment-kannact",
  },
  {
    title: "Time Artifacts",
    type: "Digital Product",
    description: "Design and sell minimalist digital calendars as digital downloads.",
    highlights: [
      "Playground project to experiment with UX/UI, typography and visual consistency",
      "Exploration outside engineering constraints",
    ],
    url: "https://timeartifacts.gumroad.com",
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
  { name: "English", level: "Advanced (B1 certified, professional working proficiency)" },
  { name: "French", level: "Elementary (A1 certified)" },
];

export const interests = {
  learning: ["TanStack Start", "AI-powered coding tools (Cursor, Claude Code)", "Motion Design"],
  personal: ["Swimming", "Music", "Graphic Design", "Travel", "Film", "Art"],
};
