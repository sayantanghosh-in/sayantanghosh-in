import type { Metadata } from "next";

import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { ImpactStrip } from "@/components/ImpactStrip";
import { Marquee } from "@/components/site/Marquee";
import { Projects } from "@/components/Projects";
import { Writing } from "@/components/Writing";
import { SITE, SOCIALS } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  jobTitle: "Tech Lead",
  description: SITE.description,
  worksFor: { "@type": "Organization", name: "Synup" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressCountry: "IN",
  },
  knowsAbout: [
    "AI agents",
    "LangGraph",
    "LangChain",
    "Retrieval-augmented generation",
    "Model Context Protocol",
    "LLM evaluation",
    "React",
    "TypeScript",
    "Next.js",
    "FastAPI",
    "PostgreSQL",
  ],
  sameAs: Object.values(SOCIALS),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Hero />
      <ImpactStrip />
      <Experience />
      <Marquee />
      <Projects />
      <Writing />
    </>
  );
}
