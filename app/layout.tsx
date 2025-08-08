import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sayantan Ghosh",
  description:
    "My name is Sayantan Ghosh. I am a front end engineer specializing in React.JS, Typescript, Next.JS and various other technologies like Express.JS, Node.JS, PostgreSQL, etc.",
  openGraph: {
    title: "Sayantan Ghosh",
    description:
      "My name is Sayantan Ghosh. I am a front end engineer specializing in React.JS, Typescript, Next.JS and various other technologies like Express.JS, Node.JS, PostgreSQL, etc.",
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
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
