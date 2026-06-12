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
