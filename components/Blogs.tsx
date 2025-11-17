import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";
import { getSortedPostsData, PostData } from "@/lib/posts";
import { Gradient } from "./Gradient";

export const Blogs = ({ max = -1 }: { max?: number }) => {
  const allPostsData: PostData[] = getSortedPostsData(max || -1);
  return allPostsData?.map(({ date, description, slug, title }, index) => {
    return (
      <section
        key={`blog-${slug}`}
        className="border-t-1 px-2 md:px-32 lg:px-80"
      >
        <div className="border-x-1 border-b-1 p-2">
          <h3 className="text-lg font-semibold mb-0.5 underline flex items-start gap-1 text-wrap">
            <Link
              href={`/blog/${slug}`}
              className="max-w-[calc(100%-14px-0.25rem)]"
            >
              {title}
            </Link>
            <IconExternalLink
              size={14}
              stroke={2}
              className="mt-2"
              color="var(--accent-foreground)"
            />
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-900 text-sm mt-2 text-wrap break-all">
            {description}
          </p>
        </div>
        {index < allPostsData?.length - 1 ? (
          <Gradient additionalClass="border-x-1" />
        ) : (
          <></>
        )}
      </section>
    );
  });
};
