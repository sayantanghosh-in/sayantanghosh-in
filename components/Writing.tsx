import Link from "next/link";
import { IconArrowUpRight, IconBrandYoutube } from "@tabler/icons-react";

import { PostRow } from "@/components/PostRow";
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
            <h2 className="display-lg scroll-enter mt-3">Essays and notes</h2>
            <p className="mt-4 max-w-[52ch] text-base text-fg-2">
              Engineering, mostly. Occasionally not.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <ul className="divide-y divide-line border-y border-line">
                {posts.map((post, index) => (
                  <Reveal key={post.slug} delay={index * 60} as="li">
                    <PostRow post={post} />
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
                  Short-form videos on what I am building and learning.
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
