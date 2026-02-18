import Link from "next/link";
import Image from "next/image";

export default function Product({ 
  title, 
  description,
  id = 1,
  image = `https://placehold.co/400x400?text=Product+${id}`,
  imageHeight = "aspect-square"
}: { 
  title: string; 
  description: string;
  id?: number;
  image?: string;
  imageHeight?: string;
}) {
  return (
    <Link href={`/products/${id}`}>
      <div className="border border-gray-300 rounded-lg overflow-hidden bg-white cursor-pointer hover:shadow-lg transition-shadow">

        {/* Product Content */}
        <div className="p-3 flex flex-col gap-4">
          {/* Product Image Placeholder */}
          <div className={`w-full ${imageHeight} relative rounded-lg overflow-hidden`}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              unoptimized
              sizes="100%"
            />
          </div>

          {/* Product Title */}
          <h3 className="text-base font-bold text-gray-900">
            {title}
          </h3>

          {/* Product Description */}
          <p className="text-sm text-gray-700">
            {description}
          </p>

          {/* More Information Link */}
          <div className="pt-2 flex justify-start md:justify-center">
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
