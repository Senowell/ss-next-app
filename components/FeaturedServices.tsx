import Image from 'next/image';
import Link from 'next/link';
import { withStrapiBaseUrl } from '@/utils/homePage';

interface Service {
  Title: string;
  Slug: string | null;
  FeaturedImage: {
    url: string;
    alternativeText: string | null;
    caption: string | null;
  };
}

interface FeaturedServicesProps {
  services: Service[];
}

export default function FeaturedServices({ services = [] }: FeaturedServicesProps) {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="py-8 px-6 md:px-0">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 md:gap-4">
        {services.map((service, idx) => {
          const slug = service.Slug || service.Title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          return (
          <Link
            key={slug}
            href={`/services/${slug}`}
            className="flex items-center gap-2 md:gap-4 p-1 border border-gray-300 rounded-lg bg-white hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* Icon/Image Placeholder */}
            <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 relative">
              <Image
                src={withStrapiBaseUrl(service.FeaturedImage?.url) || "https://placehold.co/80x80?text=Service"}
                alt={service.FeaturedImage?.alternativeText || service.Title}
                width={80}
                height={80}
                className="rounded-lg object-cover"
                unoptimized
              />
            </div>

            {/* Service Name */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2">
                {service.Title}
              </h3>
            </div>
          </Link>
          );
        })}
      </div>
    </section>
  );
}
