import { MetadataRoute } from "next";

const BASE_URL = "https://sayantanghosh.in";

type BlogPage = { slug: string; lastModified: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch your blog posts or other dynamic content
  // In a real application, this would be an API call to a CMS or database.
  const blogPosts: BlogPage[] = [
    // Add more blog posts here
  ];

  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: "weekly" as "weekly",
    priority: 0.8,
  }));

  const staticRoutes = ["", "/blog"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as "monthly",
    priority: 0.7,
  }));

  // Combine static and dynamic routes
  return [...staticRoutes, ...blogRoutes];
}
