
// src/lib/blogApi.ts
export type BlogListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;    // ISO string
  image: string;
  imageUrl?: string; // Add this for compatibility
  publishedAt?: string; // Add this for compatibility
};

export type BlogPost = BlogListItem & {
  author: string;
  read_time: string; // as returned by n8n ("5 min")
  content: string;   // HTML string
};

// ---- Endpoints (your working production URLs) ----
const API_BASE = "https://n8nottobon.duckdns.org";

// List of posts
export const BLOGS_LIST_URL = `${API_BASE}/webhook/blogs`;

// Single post by slug (this is your by-slug workflow's production URL)
export const BLOG_BY_SLUG_URL = (slug: string) =>
  `${API_BASE}/webhook/82f25359-8c38-4f01-b544-19689dba0649/blogs/${encodeURIComponent(
    slug
  )}`;

// Small fetch helper
async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

// API functions
export function getBlogs() {
  return fetchJson<BlogListItem[]>(BLOGS_LIST_URL);
}

export function getBlogBySlug(slug: string) {
  return fetchJson<BlogPost>(BLOG_BY_SLUG_URL(slug));
}

// Create blogApi object for compatibility with components
export const blogApi = {
  getAllPosts: async (): Promise<BlogListItem[]> => {
    const posts = await getBlogs();
    // Normalize the data to include both formats
    return posts.map(post => ({
      ...post,
      imageUrl: post.image || post.imageUrl,
      publishedAt: post.date || post.publishedAt,
    }));
  },
  getPostBySlug: async (slug: string): Promise<BlogPost> => {
    const post = await getBlogBySlug(slug);
    return {
      ...post,
      imageUrl: post.image || post.imageUrl,
      publishedAt: post.date || post.publishedAt,
    };
  }
};
