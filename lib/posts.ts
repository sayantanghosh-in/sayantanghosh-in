import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

// Define the type for the frontmatter metadata
export type PostData = {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
  /**
   * Set `published: false` in a post's frontmatter to hide it from the blog
   * index, the homepage and the sitemap, and to make its URL 404. Omitting the
   * field entirely means published, so existing posts are unaffected.
   */
  published?: boolean;
};

/** A post is visible unless it explicitly opts out. */
function isPublished(post: { published?: boolean }): boolean {
  return post.published !== false;
}

// Define the type for the full post content (including HTML)
export type PostContent = PostData & {
  contentHtml: string;
};

// Define the path to the posts directory
const postsDirectory = path.join(process.cwd(), "posts");

/**
 * Returns a list of all post objects with their frontmatter, sorted by date.
 * This is used for the blog list page.
 * @returns {PostData[]} An array of post objects.
 */
export function getSortedPostsData(max?: number): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get the slug
    const slug = fileName.replace(/\.md$/, "");

    // Read markdown file as a string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const data = matterResult.data as Omit<PostData, "slug">;

    // Combine the data with the slug and return
    return {
      slug,
      ...data,
    };
  });

  // Sort posts by date in descending order
  const _sortedPosts = allPostsData.filter(isPublished).sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });

  if (typeof max !== "number" || max <= -1) {
    return _sortedPosts;
  } else {
    return _sortedPosts?.slice(0, max);
  }
}

/**
 * Returns a list of all blog post slugs (file names without extension).
 * Used by `generateStaticParams` for SSG.
 * @returns {string[]} An array of post slugs.
 */
export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .map((fileName) => fileName.replace(/\.md$/, ""))
    .filter((slug) => {
      const fileContents = fs.readFileSync(
        path.join(postsDirectory, `${slug}.md`),
        "utf8",
      );
      return isPublished(matter(fileContents).data as { published?: boolean });
    });
}

/**
 * Reads a single Markdown file, parses its frontmatter and content.
 * @param {string} slug The slug of the post to read.
 * @returns {Promise<PostContent>} A promise that resolves to the post's content and metadata.
 */
export async function getPostContent(slug: string): Promise<PostContent> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // Hidden posts 404 rather than being reachable by direct URL
  if (!isPublished(data as { published?: boolean })) {
    throw new Error(`Post "${slug}" is not published`);
  }

  // Using remark-rehype pipeline to convert markdown into an HTML string
  // This pipeline specifically supports raw HTML tags (like <img>) inside markdown
  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  // Combine the data, slug, and contentHtml and return
  return {
    slug,
    contentHtml,
    ...(data as Omit<PostData, "slug">),
  };
}
