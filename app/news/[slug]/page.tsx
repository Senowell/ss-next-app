import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogBySlug, withStrapiBaseUrl, formatBlogDate } from "@/utils/blog";
import RichTextRenderer from "@/components/RichTextRenderer";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) notFound();

  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const imageUrl = blog.CoverImage?.url
    ? withStrapiBaseUrl(blog.CoverImage.url)
    : null;
  const altText = blog.CoverImage?.alternativeText ?? blog.Title;
  const date = formatBlogDate(blog.PublishedDate ?? blog.publishedAt);

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div
        className="rounded-md mx-6 md:mx-auto md:w-full my-6 py-12 px-6 text-center"
        style={{ backgroundColor: "#535253" }}
      >
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">
          {blog.Title}
        </h1>
        {blog.Summary && (
          <p className="text-gray-300 text-sm md:text-base mt-2 max-w-2xl mx-auto">
            {blog.Summary}
          </p>
        )}
        <div className="flex items-center justify-center gap-4 mt-4 text-gray-400 text-xs">
          {blog.Category && (
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
              {blog.Category}
            </span>
          )}
          {date && <span>{date}</span>}
          {blog.Author && <span>By {blog.Author}</span>}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Cover Image */}
        {imageUrl && (
          <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={imageUrl}
              alt={altText}
              fill
              className="object-cover"
              unoptimized
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
        )}

        {/* Content */}
        <article className="prose max-w-none text-gray-800">
          <RichTextRenderer content={blog.Content} />
        </article>
      </main>
    </div>
  );
}
