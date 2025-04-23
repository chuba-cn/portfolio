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
    position: "Frontend Web Developer",
    company: "CVSpan",
    companyLink: "https://www.cvspan.com/",
    address: "Nigeria - Remote",
    time: "January 2025 -Present",
    description:
      "Developed and maintained high-quality web applications using React, Redux, and TypeScript while collaborating with cross-functional teams to deliver seamless user experiences. Optimized application performance and scalability, achieving improved page load times and responsiveness, and participated in code reviews to uphold high coding standards. Additionally, contributed to the architecture and design of scalable frontend solutions by leveraging modern tools and best practices, troubleshot cross-browser and device issues for compatibility, implemented user feedback to enhance the frontend experience, and improved development workflows to boost team productivity.",
  },
  {
    position: "Frontend Web Developer",
    company: "Hotels.ng",
    companyLink: "https://hotels.ng/",
    address: "Nigeria - Remote",
    time: "September 2024 - December 2024",
    description:
      "Worked as part of a team responsible for building, maintaining, and enhancing the frontend of Telex, a tool for monitoring application performance, databases, and servers. Contributed to implementing key features such as Channels, a Slack-like interface for receiving and managing real-time events across applications in a centralized location, improving user collaboration and efficiency.",
  },
  {
    position: "Frontend Web Developer Intern",
    company: "HNG Tech",
    companyLink: "https://hngtech.com",
    address: "Nigeria - Remote",
    time: "July 2024 - August 2024",
    description:
      "Selected as one of 20 frontend finalists out of 10,000+ applicants in a competitive internship. Contributed to building Resolve, a secure online voting platform, by implementing robust authentication flows (email/password and Google via NextAuth) and leading the frontend development of the Election Creation feature. Collaborated in a remote, agile, cross-functional team to deliver the MVP.",
  },
];