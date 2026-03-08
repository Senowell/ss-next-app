import ProductGallery from "@/components/ProductGallery";
import Downloads from "@/components/Downloads";
import Product from "@/components/Product";
import { notFound } from "next/navigation";

import {
  formatFileSize,
  getProductBySlug,
  getProductImages,
  getProductShortDescription,
} from "@/utils/product";

type RichTextNode = {
  type?: string;
  text?: string;
  children?: RichTextNode[];
};

function pickHeadingAndParagraph(blocks: unknown): { heading: string; paragraph: string } {
  const list = Array.isArray(blocks) ? (blocks as RichTextNode[]) : [];

  const headingBlock = list.find((b) => b?.type === "heading");
  const paragraphBlock = list.find((b) => b?.type === "paragraph");

  const flatten = (node: RichTextNode | undefined): string => {
    if (!node) return "";
    if (typeof node.text === "string") return node.text;
    if (Array.isArray(node.children)) return node.children.map(flatten).join("");
    return "";
  };

  const heading = Array.isArray(headingBlock?.children)
    ? headingBlock.children.map(flatten).join("").trim()
    : "";
  const paragraph = Array.isArray(paragraphBlock?.children)
    ? paragraphBlock.children.map(flatten).join("").trim()
    : "";

  return { heading, paragraph };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slug = typeof id === "string" ? id : "";
  if (!slug) notFound();
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const productImages = getProductImages(product);
  const bannerTitle = product.Title;
  const bannerSubtitle = getProductShortDescription(product);
  const { heading, paragraph } = pickHeadingAndParagraph(product.Description);

  const downloads = (product.downloads_section ?? []).map((d, idx) => {
    const fileType = d.Category ?? (d.File?.name?.split(".").pop()?.toUpperCase() || "");
    const fileSize = formatFileSize(d.File?.size);
    return {
      id: idx + 1,
      title: d.Title,
      fileType,
      fileSize,
    };
  });

  const associated = (product.associatedProducts ?? []).map((p, idx) => {
    const firstImage = p.Gallery?.[0]?.url;
    return {
      id: p.Slug ?? p.documentId ?? String(idx + 1),
      title: p.Title,
      description: p.Subtitle ?? "",
      image: firstImage,
    };
  });

  return (
    <div className="min-h-screen bg-white">

      {/* Content */}
      <main className="w-12/12 mx-auto py-12 md:py-4">
        {/* Section Banner */}
        <div className="rounded-md mx-6 md:mx-auto md:w-12/12 my-6 py-12 px-0 text-center" style={{ backgroundColor: '#535253' }}>
          <div className="w-full">
            <h1 className="text-white text-2xl md:text-2xl font-bold mb-2">
              {bannerTitle}
            </h1>
            {bannerSubtitle ? (
              <p className="text-white text-lg md:text-lg font-semibold">{bannerSubtitle}</p>
            ) : null}
          </div>
        </div>

        {/* Product Section Grid */}
        <div className="mx-6 md:mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Product Gallery - Left on Desktop, Top on Mobile */}
            <ProductGallery images={productImages} />

            {/* Product Info - Right on Desktop, Bottom on Mobile */}
            <div className="flex flex-col justify-start">
              <h2 className="text-4xl md:text-xl font-bold text-gray-900 mb-6 leading-tight">
                {heading || bannerTitle}
              </h2>

              {paragraph ? (
                <p className="text-gray-700 text-base md:text-md mb-8 leading-relaxed">{paragraph}</p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Downloads Section */}
        {downloads.length > 0 ? <Downloads downloads={downloads} /> : null}

        {/* Associated Equipment Section */}
        <div className="mx-6 md:mx-auto md:w-12/12 my-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Associated Equipment</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {associated.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
