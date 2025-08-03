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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
