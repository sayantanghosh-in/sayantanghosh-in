import type { Metadata } from "next";
import { PostRow } from "@/components/PostRow";
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
          <h1 className="display-lg mt-3">Essays and notes</h1>
          <p className="mt-4 max-w-[52ch] text-base text-fg-2">
            Engineering, mostly. Occasionally not.
          </p>

          <ul className="mt-12 divide-y divide-line border-y border-line">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 50} as="li">
                <PostRow post={post} size="roomy" />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
