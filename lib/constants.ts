import { Project } from "./models";

export const FE_DATE_FORMAT = "MMM yyyy";
export const projects: Project[] = [
  {
    id: "gotodash",
    title: "GotoDash",
    description:
      " Your minimalist command center for tracking finances, goals, and productivity in one glance.",
    timeline: "May 2025 - Present",
    highlights: [
      "🎯 Financial Goals: Monitor spending goals to stay on budget.",
      "💸 Effortless Expense Management: Add, edit, and delete expenses on the fly.",
      "📊 Visualize Weekly Spends: An interactive bar chart gives you a clear view of your weekly spending habits.",
      "💻 GitHub Contribution Graph: Stay motivated with a real-time visualization of your coding activity.",
      "🎨 Clean & Minimalist UI: A beautiful, distraction-free interface to help you focus on your data.",
    ],
    stack: ["React.js", "Typescript", "Shadcn", "Tweakcn"],
    urls: {
      blogPost: "https://sayantanghosh.in/blog/projects/gotodash",
      github: "https://github.com/sayantanghosh-in/gotodash",
      landingPage: "https://gotodash.sayantanghosh.in",
      thumbnail:
        "https://cdn.loom.com/sessions/thumbnails/4e0c7201b4154223abebf4d11da367b5-c26081aca16d9009-full-play.gif",
      videoEmbed:
        "https://www.loom.com/embed/4e0c7201b4154223abebf4d11da367b5?sid=58ced054-5a19-4f8e-b476-211f4c276ab3",
    },
  },
];
