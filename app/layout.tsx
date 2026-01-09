import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "../components/Nav";
import { Gradient } from "../components/Gradient";
import { IconHeart } from "@tabler/icons-react";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sayantan Ghosh",
    template: "Sayantan Ghosh | %s",
  },
  description:
    "My name is Sayantan Ghosh. I am a front end engineer specializing in React.JS, Typescript, Next.JS and various other technologies like Express.JS, Node.JS, PostgreSQL, etc. I also create content on facebook, instagram and youtube where I post content about frontend as well as other technologies that I have learnt or am currently learning. I have started this content creation as a hobby. My channel name is TheDevGuide. Aliases are yotuube.com/@TheDevGuideYt instagram/the.dev.guide and facebook.com/TheDevGuide.",
  openGraph: {
    title: "Sayantan Ghosh",
    description:
      "My name is Sayantan Ghosh. I am a front end engineer specializing in React.JS, Typescript, Next.JS and various other technologies like Express.JS, Node.JS, PostgreSQL, etc. I also create content on facebook, instagram and youtube where I post content about frontend as well as other technologies that I have learnt or am currently learning. I have started this content creation as a hobby. My channel name is TheDevGuide. Aliases are yotuube.com/@TheDevGuideYt instagram/the.dev.guide and facebook.com/TheDevGuide.",
    url: "https://sayantanghosh.in",
    siteName: "Sayantan Ghosh",
    images: [
      {
        url: "https://sayantanghosh.in/sayantan.png",
        width: 320,
        height: 320,
        alt: "Sayantan Ghosh Website Open Graph Image",
      },
    ],
  },
  keywords: [
    "Sayantan",
    "Ghosh",
    "India",
    "Bengaluru",
    "Bangalore",
    "Sayantan Ghosh India",
    "Sayantan Ghosh Bengaluru",
    "Sayantan Ghosh Bangalore",
    "Sayantan Ghosh Karnataka",
    "Sayantan Ghosh Bengaluru Karnataka",
    "Sayantan Ghosh Bangalore Karnataka",
    "Sayantan Ghosh Bengaluru India",
    "Sayantan Ghosh Bangalore India",
    "Front end",
    "Developer",
    "Engineer",
    "React.js",
    "Typescript",
    "Next.js",
    "Express.js",
    "Node.js",
    "Postgresql",
    "Gen AI",
    "Vibe Coding",
    "Google Prompting Essentials",
    "Content",
    "Creation",
    "Creator",
    "Content Creation",
    "Content Creator",
    "Facebook",
    "fb",
    "Instagram",
    "ig",
    "Youtube",
    "yt",
    "The Dev Guide",
    "TheDevGuide",
    "thedevguide",
    "thedevguide channel",
    "thedevguide page",
    "the dev guide channel",
    "the dev guide page",
    "thedevguide youtube",
    "thedevguide yt",
    "the dev guide youtube",
    "the dev guide yt",
    "thedevguide instagram",
    "thedevguide ig",
    "the dev guide instagram",
    "the dev guide ig",
    "the.dev.guide instagram",
    "the.dev.guide ig",
    "thedevguide facebook",
    "thedevguide fb",
    "the dev guide facebook",
    "the dev guide fb",
    "TheDevGuideYt",
    "Master the code, build for the future",
    "the dev guide sayantan ghosh",
    "the dev guide sayantan",
    "thedevguide sayantan ghosh",
    "thedevguide sayantan",
  ],
  twitter: {
    card: "summary_large_image",
    title: "Sayantan Ghosh",
    description:
      "My name is Sayantan Ghosh. I am a front end engineer specializing in React.JS, Typescript, Next.JS and various other technologies like Express.JS, Node.JS, PostgreSQL, etc.",
    site: "@sayantan__ghosh",
    creator: "@sayantan__ghosh",
    images: ["https://sayantanghosh.in/sayantan.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://sayantanghosh.in/favicon.svg"
          type="image/svg+xml"
        />
      </head>
      <body className={inter.className}>
        <div>
          <header className="sticky top-0 mt-1 border-y-1 bg-background px-2 md:px-32 lg:px-80">
            <Nav />
          </header>
          <main className="mb-[58px]">{children}</main>
          <Gradient additionalClass="fixed bottom-[34px] border-t-1 bg-background" />
          <footer className="fixed bottom-0 w-full border-y-1 bg-background px-2 md:px-32 lg:px-80">
            <section className="border-x-1 px-2 text-xs flex justify-center items-center gap-0.5 py-2">
              <span>Made with</span>
              <IconHeart size={12} fill="var(--destructive)" /> by
              <span>Sayantan Ghosh</span>
            </section>
          </footer>
        </div>
      </body>
    </html>
  );
}
