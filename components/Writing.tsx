import { IconBrandX, IconBrandYoutube } from "@tabler/icons-react";

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
        eyebrow="Writing"
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

        {/*
         * X is where the day-to-day goes, so it gets the card. The YouTube
         * channel still exists but is dormant — it sits below the rule as a
         * footnote rather than a second call to action.
         */}
        <Reveal delay={120}>
          <Card className="p-6">
            <IconBrandX size={22} className="text-accent" />
            <h3 className="display-md mt-4">On X</h3>
            <p className="mt-3 text-sm text-fg-2">
              Build notes, half-finished ideas, and whatever I am reading.
            </p>
            <div className="mt-6">
              <ArrowLink external href={SOCIALS.x}>
                Follow
              </ArrowLink>
            </div>

            <div className="mt-6 border-t border-line pt-5">
              <a
                href={SOCIALS.youtube}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-fg-3 transition-colors duration-200 hover:text-fg"
              >
                <IconBrandYoutube size={16} aria-hidden />
                Older videos on YouTube
              </a>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
