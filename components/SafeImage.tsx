'use client';

import Image, { type ImageProps } from "next/image";
import { type ReactNode, useState } from "react";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
  fallback?: ReactNode;
};

export default function SafeImage({
  src,
  fallback = null,
  alt,
  onError,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <>{fallback}</>;
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      onError={(event) => {
        setHasError(true);
        onError?.(event);
      }}
    />
  );
}
