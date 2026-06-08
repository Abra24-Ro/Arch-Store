"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  src?: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
}

export const ProductImage = ({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
  priority,
  loading,
}: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const localSrc = src
    ? src.startsWith("http") || src.startsWith("blob:")
      ? src //* ← Cloudinary, externas y blob previews
      : `/products/${src}` //* ← archivos locales legacy
    : "/imgs/placeholder.jpg";

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Image
        src={localSrc}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={
          fill
            ? (sizes ??
              "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw")
            : undefined
        }
        className={className}
        priority={priority}
        loading={loading}
        onLoad={() => setIsLoading(false)}
        style={{
          ...(!fill
            ? { width: "100%", height: "100%", objectFit: "cover" }
            : {}),
          filter: isLoading ? "blur(10px)" : "blur(0px)",
          transform: isLoading ? "scale(1.05)" : "scale(1)", //* evita bordes borrosos
          transition: "filter 400ms ease, transform 400ms ease",
        }}
      />
    </div>
  );
};
