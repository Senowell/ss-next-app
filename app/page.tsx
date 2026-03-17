import FeaturedServices from "@/components/FeaturedServices";
import FeaturedProducts from "@/components/FeaturedProducts";
import { getHomeFeaturedProducts, getHomeFeaturedServices, type HomeFeaturedProduct, type FeaturedService } from "@/utils/homePage";

export default async function Home() {
  let featuredProducts: HomeFeaturedProduct[] = [];
  let featuredServices: FeaturedService[] = [];

  try {
    [featuredProducts, featuredServices] = await Promise.all([
      getHomeFeaturedProducts(),
      getHomeFeaturedServices(),
    ]);
  } catch (e) {
    console.error("Failed to load home page data", e);
  }

  return (
    <div>
      <FeaturedServices services={featuredServices} />
      <FeaturedProducts products={featuredProducts} />
    </div>
  );
}
