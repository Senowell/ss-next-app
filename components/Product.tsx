import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { getStrapiMedia } from "@/utils/strapi";

export default function Product({ 
  title, 
  description,
  id = 1,
  image,
  imageHeight = "aspect-square"
}: { 
  title: string; 
  description: string;
  id?: number | string;
  image?: string;
  imageHeight?: string;
}) {
  const imageSrc = getStrapiMedia(image);

  return (
    <Link href={`/products/${id}`} className="block h-full">
      <div className="h-full border border-gray-300 rounded-lg overflow-hidden bg-white cursor-pointer hover:shadow-lg transition-shadow flex flex-col">

        {/* Product Content */}
        <div className="p-3 flex flex-col gap-4 flex-1">
          {/* Product Image Placeholder */}
          <div className={`w-full ${imageHeight} relative rounded-lg overflow-hidden`}>
            <SafeImage
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              unoptimized
              sizes="100%"
              fallback={
                <div className="absolute inset-0 bg-gray-200" aria-hidden="true" />
              }
            />
          </div>

          {/* Product Title */}
          <h3 className="text-base font-bold text-gray-900 line-clamp-2">
            {title}
          </h3>

          {/* Product Description */}
          <p className="text-sm text-gray-700 line-clamp-2">
            {description}
          </p>

          {/* More Information Link */}
          <div className="pt-2 mt-auto flex justify-start md:justify-center">
            <span 
              className="text-base font-semibold text-gray-900 hover:text-gray-700 flex items-center gap-2 group"
            >
              More information
              <span className="text-red-500 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
