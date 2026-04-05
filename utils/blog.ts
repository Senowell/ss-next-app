import { fetchStrapi } from "./strapi";

export interface BlogCoverImage {
  url: string;
  alternativeText: string | null;
  width: number | null;
  height: number | null;
}

export interface Blog {
  documentId: string;
  Title: string;
  Slug: string;
  Summary: string | null;
  Content: unknown;
  CoverImage: BlogCoverImage | null;
  Author: string | null;
  Category: string | null;
  PublishedDate: string | null;
  publishedAt: string | null;
}

const BLOGS_QUERY = `
  query Blogs {
    blogs(sort: "PublishedDate:desc") {
      documentId
      Title
      Slug
      Summary
      Content
      Author
      Category
      PublishedDate
      publishedAt
      CoverImage {
        url
        alternativeText
        width
        height
      }
    }
  }
`;

const BLOG_BY_SLUG_QUERY = `
  query BlogBySlug($slug: String!) {
    blogs(filters: { Slug: { eq: $slug } }) {
      documentId
      Title
      Slug
      Summary
      Content
      Author
      Category
      PublishedDate
      publishedAt
      CoverImage {
        url
        alternativeText
        width
        height
      }
    }
  }
`;

export function withStrapiBaseUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";
  return `${base}${path}`;
}

export function formatBlogDate(dateStr: string | null): string {
  const raw = dateStr;
  if (!raw) return "";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function getBlogs(): Promise<Blog[]> {
  const data = await fetchStrapi(BLOGS_QUERY, {}, "graphql");
  const blogs = data?.data?.blogs;
  return Array.isArray(blogs) ? blogs : [];
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const data = await fetchStrapi(
    BLOG_BY_SLUG_QUERY,
    { variables: { slug } },
    "graphql"
  );
  const blogs: Blog[] = data?.data?.blogs ?? [];
  return blogs[0] ?? null;
}
