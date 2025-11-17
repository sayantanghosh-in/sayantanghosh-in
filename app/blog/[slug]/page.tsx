import Image from "next/image";
import { Gradient } from "@/components/Gradient";
import { getPostSlugs, getPostContent, PostContent } from "@/lib/posts";
import Link from "next/link";

// Next.js function to generate the static paths for all blog posts.
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Define the component's props with a type for the dynamic segment
interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// The individual blog post page component.
export default async function PostPage(props: PostPageProps) {
  const params = await props?.params;
  const postData: PostContent = await getPostContent(params?.slug);

  return (
    <div>
      <section className="px-2 md:px-32 lg:px-80">
        <div className="flex items-center gap-0.25 border-x-1">
          <Image
            alt="Sayantan Ghosh Photo"
            src="/sayantan.png"
            width={90}
            height={90}
            className="w-[90px] h-[90px] md:w-[130px] md:h-[130px] lg:w-[160px] lg:h-[160px] rounded-full"
          />
          <div className="w-full flex flex-col justify-start border-l-1">
            <Gradient heightClass="h-6 md:h-16 lg:h-24" />
            <h1 className="border-t-1 pt-2 pl-2 text-3xl font-semibold">
              Sayantan Ghosh
            </h1>
            <h2 className="border-t-1 mt-0.25 pt-1.25 pl-2 pb-1.25 text-sm text-[var(--accent-foreground)]">
              Frontend Developer
            </h2>
          </div>
        </div>
      </section>
      <Gradient additionalClass="border-y-1" />
      <section className="px-2 md:px-32 lg:px-80">
        <div className="flex gap-2 items-center border-x-1 p-2 text-xs text-gray-500">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          &gt;
          <Link href="/blog" className="hover:underline">
            Blog Posts
          </Link>
          &gt;
          <Link href={params?.slug} className="text-black-500 font-bold">
            {params?.slug}
          </Link>
        </div>
      </section>
      <Gradient additionalClass="border-y-1" />
      <section className="px-2 md:px-32 lg:px-80">
        <h1 className="text-2xl font-bold text-center text-gray-800 border-x-1 p-2">
          {postData.title}
        </h1>
        <Gradient additionalClass="border-1" />
        <div className="text-gray-500 border-x-1 p-2">
          <p className="text-xs">
            <b>{postData.author}</b> &bull;{" "}
            <i>
              {new Date(postData.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </i>
          </p>
        </div>
        <Gradient additionalClass="border-1" />
        {/* Render the HTML content from the Markdown */}
        <div
          className="prose prose-sm max-w-none border-x-1 p-2"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </section>
    </div>
  );
}
