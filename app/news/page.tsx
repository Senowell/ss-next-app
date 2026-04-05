import Link from "next/link";
import Image from "next/image";
import { getBlogs, withStrapiBaseUrl, formatBlogDate, type Blog } from "@/utils/blog";

export default async function NewsPage() {
  let blogs: Blog[] = [];
  let error = false;

  try {
    blogs = await getBlogs();
  } catch {
    error = true;
  }

  return (
    <div className="w-full py-6">
      {/* News Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-6 px-6 md:px-12 mb-8 rounded-lg mx-6 md:mx-0">
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
          News
        </h1>
      </div>

      {/* Error state */}
      {error && (
        <p className="text-center text-red-500 py-12">
          Failed to load news. Please try again later.
        </p>
      )}

      {/* Empty state */}
      {!error && blogs.length === 0 && (
        <p className="text-center text-gray-500 py-12">No news posts yet.</p>
      )}

      {/* News Grid */}
      {!error && blogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-6 md:mx-0">
          {blogs.map((blog) => {
            const imageUrl = blog.CoverImage?.url
              ? withStrapiBaseUrl(blog.CoverImage.url)
              : `https://placehold.co/800x400?text=${encodeURIComponent(blog.Title)}`;
            const altText = blog.CoverImage?.alternativeText ?? blog.Title;
            const date = formatBlogDate(blog.PublishedDate ?? blog.publishedAt);

            return (
              <Link
                key={blog.documentId}
                href={`/news/${blog.Slug}`}
                className="block group border border-gray-300 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow flex flex-col"
              >
                {/* Cover Image */}
                <div className="relative w-full h-56">
                  <Image
                    src={imageUrl}
                    alt={altText}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  {blog.Category && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      {blog.Category}
                    </span>
                  )}
                  <h2 className="text-base font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.Title}
                  </h2>
                  {blog.Summary && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {blog.Summary}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                    {date && (
                      <span className="text-xs text-gray-400">{date}</span>
                    )}
                    {blog.Author && (
                      <span className="text-xs text-gray-500">
                        By {blog.Author}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
