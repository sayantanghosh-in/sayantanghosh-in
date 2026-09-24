import Link from "next/link";
import { IconArrowUpRight, IconBrandYoutube } from "@tabler/icons-react";
import { format } from "date-fns";

import { Reveal } from "@/components/site/Reveal";
import { getSortedPostsData } from "@/lib/posts";
import { SOCIALS } from "@/lib/site";

export function Writing() {
  const posts = getSortedPostsData(3);

  return (
    <section id="writing" className="border-b border-line">
      <div className="container-page">
        <div className="rails px-4 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow">Writing &amp; video</p>
            <h2 className="display-lg mt-3">Notes from the work</h2>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <ul className="divide-y divide-line border-y border-line">
                {posts.map((post, index) => (
                  <Reveal key={post.slug} delay={index * 60} as="li">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col gap-2 py-5 transition-colors duration-200 sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <time
                        dateTime={post.date}
                        className="eyebrow shrink-0 sm:w-28"
                      >
                        {format(new Date(post.date), "dd MMM yyyy")}
                      </time>
                      <span className="flex-1">
                        <span className="block font-medium transition-colors duration-200 group-hover:text-accent-ink">
                          {post.title}
                        </span>
                        <span className="mt-1 block text-sm text-fg-3">
                          {post.description}
                        </span>
                      </span>
                      <IconArrowUpRight
                        size={16}
                        className="hidden shrink-0 text-fg-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
                      />
                    </Link>
                  </Reveal>
                ))}
              </ul>

              <Link
                href="/blog"
                className="eyebrow mt-6 inline-block text-accent-ink transition-colors duration-200 hover:text-fg"
              >
                All writing →
              </Link>
            </div>

            <Reveal delay={120}>
              <div className="card-surface p-6">
                <IconBrandYoutube size={22} className="text-accent" />
                <h3 className="display-md mt-4">On YouTube</h3>
                <p className="mt-3 text-sm text-fg-2">
                  I make short-form videos about the things I am building and
                  learning — agents, tooling, and the parts of frontend
                  engineering nobody writes down.
                </p>
                <a
                  href={SOCIALS.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-medium transition-colors duration-200 hover:border-line-hi hover:bg-bg-band"
                >
                  Subscribe
                  <IconArrowUpRight size={15} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
