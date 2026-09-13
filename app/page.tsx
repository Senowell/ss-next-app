import FeaturedServices from "@/components/FeaturedServices";
import FeaturedProducts from "@/components/FeaturedProducts";
import VideoPlayer from "@/components/VideoPlayer";
import type { VideoFieldData } from "@/components/VideoPlayer";
import { getHomeFeaturedProducts, getHomeFeaturedServices, getHomePageVideo, type HomeFeaturedProduct, type FeaturedService } from "@/utils/homePage";

export default async function Home() {
  let featuredProducts: HomeFeaturedProduct[] = [];
  let featuredServices: FeaturedService[] = [];
  let homePageVideo: VideoFieldData | null = null;

  try {
    [featuredProducts, featuredServices, homePageVideo] = await Promise.all([
      getHomeFeaturedProducts(),
      getHomeFeaturedServices(),
      getHomePageVideo(),
    ]);
  } catch (e) {
    console.error("Failed to load home page data", e);
  }

  return (
    <div>
      <FeaturedServices services={featuredServices} />
      <FeaturedProducts products={featuredProducts} />
      {homePageVideo && (
        <div className="my-12 px-6">
          <VideoPlayer video={homePageVideo} />
        </div>
      )}
    </div>
  );
}
