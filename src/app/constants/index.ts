export const navLinks = [
  { id: "about", title: "About", url: "#about" },
  { id: "services", title: "What I Do", url: "#services" },
  { id: "stack", title: "Stack", url: "#stack" },
  { id: "work", title: "Work", url: "#work" },
  { id: "experience", title: "Experience", url: "#experience" },
  { id: "contact", title: "Contact", url: "#contact" },
];

export const EMAIL = "chinemelumchubanwene57@gmail.com";

export const socials = [
  { id: "github", title: "GitHub", url: "https://github.com/chuba-cn" },
  {
    id: "linkedin",
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/chinemelum-chuba-nwene-bb4098175",
  },
  { id: "twitter", title: "X (Twitter)", url: "https://x.com/c__chuba" },
] as const;

interface Experience{
    position: string;
    company: string;
    address: string;
    companyLink: string;
    time: string;
    description: string
}

export const experience: Experience[] = [
  {
    position: "Lead, Frontend Engineer",
    company: "TheTravelHunters",
    companyLink: "https://www.thetravelhunters.com/",
    address: "Remote",
    time: "June 2025 - Present",
    description:
      "Lead frontend engineering for the customer-facing platform of a travel-booking business. Led development of a Search & Analytics Dashboard used by four teams—management, sales, marketing, and support—surfacing hotel and destination trends across configurable time ranges, and rebuilt the Admin Booking Management UI and Hotel Reservation portal to give properties self-serve control over availability—cutting manual confirmation calls by 62%, reducing support tickets by 35%, and improving booking response time from 4 minutes to 45 seconds. Engineered a multi-product bundle checkout for hotels, taxis, and tours—building the taxi experience end-to-end with real-time availability, dynamic pricing, and pickup/drop-off selection—driving a 28% increase in average order value and unlocking 1.2M+ in annualized revenue within six months. Scaled performance by refactoring client-side fetching to server-initiated streaming with Suspense (41% faster perceived load), offloading analytics to Partytown web workers, and shipping a custom session-tracking system with a live super-admin dashboard for 50k+ monthly sessions.",
  },
  {
    position: "Frontend Developer",
    company: "CVSpan",
    companyLink: "https://www.cvspan.com/",
    address: "Remote",
    time: "January 2025 - June 2025",
    description:
      "Developed and maintained core SaaS features using React.js, Redux Toolkit, and TypeScript. Implemented code splitting and lazy loading to cut average page load times by 15% and lift user satisfaction scores by 10%. Collaborated with product managers, UX designers, and backend engineers to architect and ship scalable frontend features, led code reviews, and enforced quality standards—cutting the bug escape rate by 40% and reducing average PR review time from 2 days to 6 hours. Drove consistent delivery in a fast-paced Agile team, helping maintain a 98% sprint completion rate while shipping 12+ high-impact features per quarter.",
  },
  {
    position: "Frontend Developer",
    company: "Hotels.ng",
    companyLink: "https://hotels.ng/",
    address: "Remote",
    time: "September 2024 - December 2024",
    description:
      "Worked on Telex.im, a Slack-alternative team collaboration platform. Engineered the real-time messaging UI in React.js and TypeScript—threading, channel switching, presence, typing/read receipts, file sharing, and direct messages—with WebSocket transport via Centrifugo, optimistic updates, and connection-aware retry, achieving sub-200ms perceived delivery for 1,000+ concurrent users per workspace. Built a live system-monitoring dashboard inside Telex that streams database, server, and application telemetry over WebSocket push with webhook-driven alerting, cutting average incident response time by ~5 minutes. Established the frontend foundation for the squad—shared component library (Tailwind + Radix), routing layer, Zustand + TanStack Query state architecture, and end-to-end TypeScript types shared with the backend. Also co-built Lumbo, a real-time multiplayer game, supporting 1,000+ concurrent players with low-latency game-state sync.",
  },
  {
    position: "Frontend Developer Intern",
    company: "HNG Tech",
    companyLink: "https://hngtech.com",
    address: "Remote",
    time: "July 2024 - August 2024",
    description:
      "Selected as a top-20 finalist from 10,000+ applicants. Spearheaded the frontend architecture for Resolve, a real-time online voting platform, using Next.js, TypeScript, Zustand, TanStack Query/Table, Socket.io, and Tailwind CSS—achieving 99.9% uptime during peak load testing with 5,000+ simulated concurrent users. Built secure email/password and Google OAuth login with NextAuth.js and shipped the full Election Creation flow with validation, reducing signup drop-off by 42% and cutting election setup time from 15 minutes to 3 minutes. Engineered a high-usability, fully responsive elections listings page with filtering and real-time status tracking, improving page load speed by 55% and mobile engagement by 30%.",
  },
];

// Engineering impact metrics (real, from résumé) — replaces freelancer-style counters
export const metrics = [
  { value: "62%", prefix: "−", label: "Manual confirmation calls" },
  { value: "1.2M+", label: "Revenue unlocked" },
  { value: "200ms", prefix: "<", label: "Real-time delivery" },
  { value: "99.9%", label: "Uptime at peak load" },
];

export interface Service {
  id: string;
  title: string;
  text: string;
  accent: string; // tailwind text color class, e.g. "text-color-1"
}

export const services: Service[] = [
  {
    id: "architecture",
    title: "Frontend Architecture & Design Systems",
    text: "I build scalable component libraries, design systems, and frontend architecture in React, Next.js, and TypeScript—standardizing patterns that let teams ship faster with fewer runtime errors.",
    accent: "text-color-1",
  },
  {
    id: "realtime",
    title: "Real-time & Performance",
    text: "From WebSocket-driven dashboards to server-streamed UIs with Suspense, I engineer real-time, high-performance interfaces—killing network waterfalls and keeping things responsive under heavy load.",
    accent: "text-color-4",
  },
  {
    id: "fullstack",
    title: "Full-stack Product Engineering",
    text: "I ship end-to-end products on the T3 / Next.js stack—tRPC, Prisma, PostgreSQL, auth, and payments—turning ideas into type-safe, production-ready applications.",
    accent: "text-color-2",
  },
];

export interface TechGroup {
  category: string;
  items: string[];
}

export const techStack: TechGroup[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Rust (learning)"],
  },
  {
    category: "Frameworks",
    items: ["React.js", "Next.js", "Node.js", "Express.js", "SolidJS", "tRPC"],
  },
  {
    category: "State & Data",
    items: ["Zustand", "TanStack Query", "Redux Toolkit", "Prisma", "PostgreSQL", "MongoDB"],
  },
  {
    category: "Real-time",
    items: ["WebSockets", "Socket.io", "Centrifugo", "Server-Sent Events"],
  },
  {
    category: "Styling & UI",
    items: ["Tailwind CSS", "ShadcnUI", "Radix UI", "Framer Motion"],
  },
  {
    category: "Tooling",
    items: ["Git & GitHub", "Vercel", "Figma", "Postman", "CI/CD", "Jest / RTL"],
  },
];

export const companies = [
  { name: "TheTravelHunters", url: "https://www.thetravelhunters.com/" },
  { name: "Hotels.ng", url: "https://hotels.ng/" },
  { name: "CVSpan", url: "https://www.cvspan.com/" },
  { name: "HNG Tech", url: "https://hngtech.com" },
];

export interface Project {
  id: string;
  title: string;
  type: string;
  summary: string;
  featured: boolean;
  link: string;
  linkLabel: string;
  github: string;
  tags: string[];
  image?: string; // key resolved to a static import in the Projects component
  cover?: "nothrow"; // custom SVG cover, resolved in the component
}

export const projects: Project[] = [
  {
    id: "velora",
    title: "Velora",
    type: "AI-Powered Email Client",
    summary:
      "An AI email client on the T3 Stack featuring Retrieval-Augmented Generation (RAG), vector search, smart compose, and a context-aware chatbot over your inbox. Fully type-safe via tRPC, with Prisma ORM, NextAuth, and Stripe subscriptions.",
    featured: true,
    link: "https://velora-three.vercel.app/",
    linkLabel: "Visit project",
    github: "https://github.com/chuba-cn/velora",
    tags: ["Next.js", "tRPC", "Prisma", "AI / RAG"],
    image: "velora",
  },
  {
    id: "callify",
    title: "Callify",
    type: "Video Conferencing App",
    summary:
      "A Next.js + TypeScript video conferencing app on the Stream Video SDK. Secure auth, meeting scheduling, recording, screen sharing, live chat, and participant management in a fully responsive experience.",
    featured: true,
    link: "https://callify.vercel.app/",
    linkLabel: "Visit project",
    github: "https://github.com/chuba-cn/callify",
    tags: ["Next.js", "Stream SDK", "WebRTC"],
    image: "callify",
  },
  {
    id: "nothrow",
    title: "NoThrow",
    type: "Open-Source TypeScript Library",
    summary:
      "A type-safe error-handling library inspired by Rust's Result and Option types. Generator-based error propagation makes failures explicit at compile time—no nested try/catch. Published on npm as nothrow-ts.",
    featured: false,
    link: "https://www.npmjs.com/package/nothrow-ts",
    linkLabel: "View on npm",
    github: "https://github.com/chuba-cn/NoThrow",
    tags: ["TypeScript", "Rust-inspired", "Open Source"],
    cover: "nothrow",
  },
  {
    id: "devlinks",
    title: "Devlinks",
    type: "Link Sharing Platform",
    summary:
      "A link-sharing platform for developers to curate a professional profile with drag-and-drop reordering and a shareable public page.",
    featured: false,
    link: "https://devlinks-theta-six.vercel.app/",
    linkLabel: "Visit project",
    github: "https://github.com/chuba-cn/devlinks",
    tags: ["React", "Drag & Drop", "TypeScript"],
    image: "devlinks",
  },
];
