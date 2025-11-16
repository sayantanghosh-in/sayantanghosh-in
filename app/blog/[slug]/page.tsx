import { getPostSlugs, getPostContent, PostContent } from "@/lib/posts";

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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          {postData.title}
        </h1>
        <div className="text-center text-gray-500 mb-8">
          <p>
            By {postData.author} on{" "}
            {new Date(postData.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        {/* Render the HTML content from the Markdown */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </div>
    </div>
  );
}
