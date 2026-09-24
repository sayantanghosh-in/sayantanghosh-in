"use client";

import { useEffect } from "react";

type EmbedSpec = {
  selector: string;
  src: string;
  id: string;
};

const EMBEDS: EmbedSpec[] = [
  {
    selector: "blockquote.twitter-tweet",
    src: "https://platform.x.com/widgets.js",
    id: "x-widgets",
  },
  {
    selector: "blockquote.instagram-media",
    src: "https://www.instagram.com/embed.js",
    id: "instagram-embed",
  },
];

/**
 * Loads social embed scripts only once the embed is about to enter the
 * viewport, and only if that kind of embed exists on the page.
 *
 * Embeds render as styled blockquotes without any JS at all, so this is a
 * pure enhancement — and keeping the third-party script off the critical path
 * is what protects the Lighthouse score.
 */
export function EmbedLoader() {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const embed of EMBEDS) {
      const nodes = document.querySelectorAll(embed.selector);
      if (nodes.length === 0) continue;

      const load = () => {
        if (document.getElementById(embed.id)) return;
        const script = document.createElement("script");
        script.id = embed.id;
        script.src = embed.src;
        script.async = true;
        script.charset = "utf-8";
        document.body.appendChild(script);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            load();
            observer.disconnect();
          }
        },
        { rootMargin: "400px" },
      );

      nodes.forEach((node) => observer.observe(node));
      observers.push(observer);
    }

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return null;
}
