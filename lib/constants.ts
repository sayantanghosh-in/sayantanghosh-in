import { Content, Project } from "./models";

export const FE_DATE_FORMAT = "MMM yyyy";
export const projects: Project[] = [
  {
    id: "turboedit",
    title: "TurboEdit",
    description:
      "A blazing-fast WYSIWYG editor powered by Tiptap that generates clean Markdown and front matter for your next great article.",
    timeline: "Aug 2025 - Present",
    highlights: [
      `✨ Intuitive WYSIWYG Editor: Write and format your content seamlessly with a clean, "what you see is what you get" interface.`,
      "</> Instant Markdown Generation: Effortlessly switch to a code view and export clean, compliant Markdown with a single click.",
      "📝 Built-in Front Matter: Easily add and configure YAML front matter, perfect for blogs, documentation, and static site generators.",
      "🧰 Rich Formatting Toolkit: Full support for headers, lists, links, images, code blocks, bold, italics, and much more.",
      "🚀 Lightweight & Fast: A minimal, distraction-free editor designed for speed and efficiency to keep you in the flow.",
    ],
    stack: ["Tiptap", "Next.js", "Typescript", "Shadcn"],
    urls: {
      blogPost: "https://sayantanghosh.in/blog/projects/turboedit",
      github: "https://github.com/sayantanghosh-in/turboedit",
      landingPage: "https://turboedit.sayantanghosh.in",
    },
  },
  {
    id: "gotodash",
    title: "GotoDash",
    description:
      "Your minimalist command center for tracking finances, goals, and productivity in one glance.",
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
    },
  },
];

export const contentCreation: Content[] = [
  {
    id: "facebook",
    label: "/TheDevGuide",
    url: "https://wwww.facebook.com/TheDevGuide",
  },
  {
    id: "instagram",
    label: "/the.dev.guide",
    url: "https://www.instagram.com/the.dev.guide",
  },
  {
    id: "youtube",
    label: "/@TheDevGuideYt",
    url: "https://www.youtube.com/@TheDevGuideYt",
  },
];
