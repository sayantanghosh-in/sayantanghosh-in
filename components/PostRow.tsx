import Link from "next/link";
import { format } from "date-fns";
import { IconArrowUpRight } from "@tabler/icons-react";

import type { PostData } from "@/lib/posts";

type PostRowProps = {
  post: PostData;
  /** The blog index gives each row more room than the homepage does. */
  size?: "compact" | "roomy";
};

export function PostRow({ post, size = "compact" }: PostRowProps) {
  const roomy = size === "roomy";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col gap-2 ${roomy ? "py-6" : "py-5"} sm:flex-row sm:items-baseline sm:gap-6`}
    >
      <div className="eyebrow flex shrink-0 items-center gap-3 sm:w-32 sm:flex-col sm:items-start sm:gap-1">
        <time dateTime={post.date}>{format(new Date(post.date), "dd MMM yyyy")}</time>
        {post.category ? (
          <span className="text-accent-ink">{post.category}</span>
        ) : null}
      </div>

      <div className="flex-1">
        <span
          className={`block transition-colors duration-200 group-hover:text-accent-ink ${roomy ? "display-md" : "font-medium"}`}
        >
          {post.title}
        </span>
        <span className="mt-1.5 block max-w-[58ch] text-sm text-fg-3">
          {post.description}
        </span>
        <span className="eyebrow mt-2.5 block">
          {post.readingMinutes} min read
        </span>
      </div>

      <IconArrowUpRight
        size={roomy ? 18 : 16}
        className="hidden shrink-0 text-fg-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent sm:block"
      />
    </Link>
  );
}
