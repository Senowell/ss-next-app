import Product from "./Product";

import {
  getHomeFeaturedProducts,
  richTextToPlainText,
  type HomeFeaturedProduct,
} from "@/utils/homePage";
import { getStrapiMedia } from "@/utils/strapi";

type FeaturedProductsProps = {
  products?: HomeFeaturedProduct[];
};

export default async function FeaturedProducts({ products }: FeaturedProductsProps) {
  let featuredProducts = products;

  if (!featuredProducts) {
    try {
      featuredProducts = await getHomeFeaturedProducts();
    } catch (e) {
      console.error("Failed to load featured products", e);
      featuredProducts = [];
    }
  }

  const cards = featuredProducts.map((p, index) => {
    const fallbackDescription = richTextToPlainText(p.Description);
    const description = (p.Subtitle ?? fallbackDescription ?? "").trim();

    const firstImage = p.Gallery?.[0]?.url;
    const image = firstImage ? getStrapiMedia(firstImage) : undefined;

    const stableId = p.Slug ?? p.documentId ?? String(index + 1);

    return {
      id: stableId,
      title: p.Title,
      description,
      image,
    };
  });

  if (cards.length === 0) return null;

  return (
    <section className="py-8 px-6 md:px-0">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2 md:mb-4 lg:mb-6">Products</h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
}
