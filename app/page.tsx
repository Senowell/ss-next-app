import FeaturedServices from "@/components/FeaturedServices";
import FeaturedProducts from "@/components/FeaturedProducts";
import { getHomeFeaturedProducts, type HomeFeaturedProduct } from "@/utils/homePage";

export default async function Home() {
  let featuredProducts: HomeFeaturedProduct[] = [];
  try {
    featuredProducts = await getHomeFeaturedProducts();
  } catch (e) {
    console.error("Failed to load home page featured products", e);
  }

  return (
    <div>
      <FeaturedServices />
      <FeaturedProducts products={featuredProducts} />
    </div>
  );
}
