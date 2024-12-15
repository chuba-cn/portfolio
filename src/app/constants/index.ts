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
        company: "Hotels.ng",
        companyLink: "https://hotels.ng/",
        address: "Nigeria - Remote",
        time: "July 2024 -Present",
        description: "Worked as part of a team responsible for building, maintaining, and enhancing the frontend of Telex, a tool for monitoring application performance, databases, and servers. Contributed to implementing key features such as Channels, a Slack-like interface for receiving and managing real-time events across applications in a centralized location, improving user collaboration and efficiency."
    },
    {
        position: "Frontend Web Developer Intern",
        company: "HNG Tech",
        companyLink: "https://hngtech.com",
        address: "Nigeria - Remote",
        time: "April 2024 - June 2024",
        description: "Selected as one of 50 frontend finalists from 5,000+ applicants in a competitive internship program. Collaborated with a team to build the prototype for Lumbo.fun, focusing on messaging, game logic, real-time updates, and state management. Designed and implemented key projects, including Giorra Online Store, an e-commerce platform with Stripe integration, and Devlinks, a link-sharing platform for developers. Gained agile experience through stand-ups and sprints, conducted code reviews, and received a direct employment offer from Hotels.ng for exceptional performance."
    }
]