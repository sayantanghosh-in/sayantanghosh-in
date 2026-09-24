import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { IconArrowLeft } from "@tabler/icons-react";

import { CodeCopy } from "@/components/site/CodeCopy";
import { EmbedLoader } from "@/components/site/EmbedLoader";
import {
  getPostContent,
  getPostSlugs,
  getSortedPostsData,
  type PostContent,
} from "@/lib/posts";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

/**
 * Only the slugs above exist. Without this, Next renders unknown slugs on
 * demand, so a post marked `published: false` would still be reachable by URL.
 */
export const dynamicParams = false;

type PostPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;

  let post: PostContent;
  try {
    post = await getPostContent(slug);
  } catch {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE.url}/blog/${slug}`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: SITE.xHandle,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  let post: PostContent;
  try {
    post = await getPostContent(slug);
  } catch {
    notFound();
  }

  const allPosts = getSortedPostsData();
  const currentIndex = allPosts.findIndex((entry) => entry.slug === slug);
  // The list is newest first, so the "previous" post is the next index along.
  const previous = currentIndex >= 0 ? allPosts[currentIndex + 1] : undefined;
  const next = currentIndex > 0 ? allPosts[currentIndex - 1] : undefined;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author, url: SITE.url },
    publisher: { "@type": "Person", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/blog/${slug}`,
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <EmbedLoader />
      <CodeCopy />

      <article>
        <div className="container-page">
          <div className="rails px-4 py-12 sm:px-8 sm:py-16">
            <Link
              href="/blog"
              className="eyebrow inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-fg"
            >
              <IconArrowLeft size={13} />
              All writing
            </Link>

            <header className="mt-10">
              <div className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
                {post.category ? (
                  <>
                    <span className="text-accent-ink">{post.category}</span>
                    <span aria-hidden className="text-line-hi">
                      /
                    </span>
                  </>
                ) : null}
                <time dateTime={post.date}>
                  {format(new Date(post.date), "dd MMMM yyyy")}
                </time>
                <span aria-hidden className="text-line-hi">
                  /
                </span>
                <span>{post.readingMinutes} min read</span>
              </div>

              <h1 className="display-lg mt-5 max-w-[20ch]">{post.title}</h1>

              <p className="mt-6 max-w-[var(--measure)] text-lg text-fg-2">
                {post.description}
              </p>
            </header>

            <hr className="mt-12 border-line" />

            <div
              className="prose mt-12 max-w-[var(--measure)] prose-headings:font-[family-name:var(--font-display)]"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              suppressHydrationWarning
            />

            {post.tags?.length ? (
              <ul className="mt-14 flex flex-wrap gap-2 border-t border-line pt-8">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="eyebrow rounded-full border border-line px-2.5 py-1 text-fg-3"
                  >
                    {tag.replace(/^#/, "")}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </article>

      {(previous || next) && (
        <nav
          aria-label="More posts"
          className="border-y border-line bg-bg-band"
        >
          <div className="container-page">
            <div className={`rails grid gap-px bg-line ${previous && next ? "sm:grid-cols-2" : ""}`}>
              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="group bg-bg-band px-5 py-8 transition-colors duration-200 hover:bg-bg-elev sm:px-8"
                >
                  <span className="eyebrow">← Previous</span>
                  <span className="mt-2 block font-medium transition-colors duration-200 group-hover:text-accent-ink">
                    {previous.title}
                  </span>
                </Link>
              ) : null}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group bg-bg-band px-5 py-8 text-right transition-colors duration-200 hover:bg-bg-elev sm:px-8"
                >
                  <span className="eyebrow">Next →</span>
                  <span className="mt-2 block font-medium transition-colors duration-200 group-hover:text-accent-ink">
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </div>
          </div>
        </nav>
      )}

    </>
  );
}
