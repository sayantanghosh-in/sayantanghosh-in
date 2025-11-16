import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// Define the type for the frontmatter metadata
export type PostData = {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
};

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
  const _sortedPosts = allPostsData.sort((a, b) => {
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
    .map((fileName) => fileName.replace(/\.md$/, ""));
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

  // Use remark to convert markdown into an HTML string
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  // Combine the data, slug, and contentHtml and return
  return {
    slug,
    contentHtml,
    ...(data as Omit<PostData, "slug">),
  };
}
