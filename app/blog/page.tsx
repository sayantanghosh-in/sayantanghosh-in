import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import { IconArrowUpRight } from "@tabler/icons-react";

import { Reveal } from "@/components/site/Reveal";
import { getSortedPostsData } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and notes on AI agents, developer tooling and frontend engineering by Sayantan Ghosh.",
  alternates: { canonical: "/blog" },
};

export default function BlogListPage() {
  const posts = getSortedPostsData();

  return (
    <section className="border-b border-line">
      <div className="container-page">
        <div className="rails px-4 py-16 sm:px-8 sm:py-24">
          <p className="eyebrow">Writing</p>
          <h1 className="display-lg mt-3">Notes from the work</h1>
          <p className="mt-4 max-w-[60ch] text-base text-fg-2">
            Mostly about agents, developer tooling, and the parts of frontend
            engineering nobody writes down.
          </p>

          <ul className="mt-12 divide-y divide-line border-y border-line">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 50} as="li">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <time
                    dateTime={post.date}
                    className="eyebrow shrink-0 sm:w-28"
                  >
                    {format(new Date(post.date), "dd MMM yyyy")}
                  </time>
                  <span className="flex-1">
                    <span className="display-md block transition-colors duration-200 group-hover:text-accent-ink">
                      {post.title}
                    </span>
                    <span className="mt-2 block max-w-[60ch] text-sm text-fg-2">
                      {post.description}
                    </span>
                  </span>
                  <IconArrowUpRight
                    size={18}
                    className="hidden shrink-0 text-fg-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
