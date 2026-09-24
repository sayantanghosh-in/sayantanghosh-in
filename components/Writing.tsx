import { IconBrandYoutube } from "@tabler/icons-react";

import { PostRow } from "@/components/PostRow";
import {
  ArrowLink,
  Card,
  Section,
  SectionHeading,
} from "@/components/primitives";
import { Reveal } from "@/components/site/Reveal";
import { getSortedPostsData } from "@/lib/posts";
import { SOCIALS } from "@/lib/site";

export function Writing() {
  const posts = getSortedPostsData(3);

  return (
    <Section id="writing">
      <SectionHeading
        eyebrow="Writing & video"
        title="Essays and notes"
        lede="Engineering, mostly. Occasionally not."
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <ul className="divide-y divide-line border-y border-line">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 60} as="li">
                <PostRow post={post} />
              </Reveal>
            ))}
          </ul>

          <div className="mt-6">
            <ArrowLink href="/blog">All writing</ArrowLink>
          </div>
        </div>

        <Reveal delay={120}>
          <Card className="p-6">
            <IconBrandYoutube size={22} className="text-accent" />
            <h3 className="display-md mt-4">On YouTube</h3>
            <p className="mt-3 text-sm text-fg-2">
              Short-form videos on what I am building and learning.
            </p>
            <div className="mt-6">
              <ArrowLink external href={SOCIALS.youtube}>
                Subscribe
              </ArrowLink>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
