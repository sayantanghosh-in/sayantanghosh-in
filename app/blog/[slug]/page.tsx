import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { IconArrowLeft } from "@tabler/icons-react";

import { EmbedLoader } from "@/components/site/EmbedLoader";
import { getPostContent, getPostSlugs, type PostContent } from "@/lib/posts";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

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

      <article className="border-b border-line">
        <div className="container-page">
          <div className="rails px-4 py-12 sm:px-8 sm:py-16">
            <Link
              href="/blog"
              className="eyebrow inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-fg"
            >
              <IconArrowLeft size={13} />
              All writing
            </Link>

            <header className="mt-8 border-b border-line pb-8">
              <h1 className="display-lg max-w-[22ch]">{post.title}</h1>
              <div className="eyebrow mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <time dateTime={post.date}>
                  {format(new Date(post.date), "dd MMMM yyyy")}
                </time>
                <span aria-hidden>·</span>
                <span>{post.author}</span>
              </div>
              {post.tags?.length ? (
                <ul className="mt-5 flex flex-wrap gap-2">
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
            </header>

            <div
              className="prose prose-neutral mt-10 max-w-[68ch] dark:prose-invert prose-headings:font-[family-name:var(--font-display)] prose-headings:tracking-tight prose-a:text-accent-ink prose-a:decoration-accent/30 prose-a:underline-offset-4 hover:prose-a:decoration-accent prose-blockquote:border-l-accent prose-code:rounded prose-code:bg-bg-band prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-line prose-pre:bg-bg-band"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              suppressHydrationWarning
            />
          </div>
        </div>
      </article>
    </>
  );
}
