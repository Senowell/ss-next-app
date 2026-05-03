'use client';

import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SafeImage from '@/components/SafeImage';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [mainSliderRef, setMainSliderRef] = useState<Slider | null>(null);
  const [thumbSliderRef, setThumbSliderRef] = useState<Slider | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full bg-gray-200 rounded-2xl aspect-square flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const mainSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: thumbSliderRef,
  };

  const thumbnailSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: mainSliderRef,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="w-full space-y-4 mb-4 md:mb-0">
      {/* Main Image Carousel */}
      <div className="w-full bg-gray-100 rounded-2xl overflow-hidden aspect-square relative">
        <Slider ref={(slider: Slider | null) => setMainSliderRef(slider)} {...mainSettings}>
          {images.map((image, index) => (
            <div key={index} className="w-full h-full">
              <div className="relative w-full aspect-square">
                <SafeImage
                  src={image}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-contain"
                  priority={index === 0}
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  fallback={
                    <div className="absolute inset-0 bg-gray-200" aria-hidden="true" />
                  }
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Thumbnails Carousel */}
      {images.length > 0 && (
        <div className="w-full">
          <Slider ref={(slider: Slider | null) => setThumbSliderRef(slider)} {...thumbnailSettings}>
            {images.map((image, index) => (
              <div key={index} className="px-2">
                <button
                  className="w-full aspect-square relative rounded-lg overflow-hidden transition-all border-2 border-gray-300 hover:border-gray-400 focus:border-gray-900"
                  aria-label={`View image ${index + 1}`}
                  type="button"
                >
                  <SafeImage
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="100px"
                    fallback={
                      <div className="absolute inset-0 bg-gray-200" aria-hidden="true" />
                    }
                  />
                </button>
              </div>
            ))}
          </Slider>
        </div>
      )}

      <style jsx global>{`
        .slick-slider {
          margin: 0;
          padding: 0;
        }

        .slick-list {
          margin: 0;
          padding: 0;
        }

        .slick-track {
          display: flex;
        }

        .slick-slide {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .slick-prev:before,
        .slick-next:before {
          color: #000;
          font-size: 24px;
        }

        .slick-prev,
        .slick-next {
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
