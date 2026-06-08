"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperObject } from "swiper";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./slideshow.css";
import { ProductImage } from "../..";

interface SlideShowProps {
  images: string[];
  title: string;
  className?: string;
  inStock: number;
}

export const SlideShow = ({
  images,
  title,
  className,
  inStock,
}: SlideShowProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject | null>(null);

  return (
    <div className={`flex flex-col h-full bg-[#EFEDE9] ${className ?? ""}`}>
      {/* imagen principal */}
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#1a1a1a",
            "--swiper-pagination-color": "#1a1a1a",
          } as React.CSSProperties
        }
        spaceBetween={0}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="swiper-main flex-1"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image}-${index}`}>
            <ProductImage
              src={image}
              alt={title}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Badge de stock */}
      {inStock <= 5 && inStock > 0 && (
        <div
          style={{
            padding: "8px 16px",
            background: "var(--color-bg)",
            borderTop: "0.5px solid var(--color-border)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "var(--color-warning)",
          }}
        >
          Solo quedan {inStock} unidades
        </div>
      )}

      {inStock === 0 && (
        <div
          style={{
            padding: "8px 16px",
            background: "var(--color-bg)",
            borderTop: "0.5px solid var(--color-border)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "var(--color-error)",
          }}
        >
          Sin stock
        </div>
      )}

      {/* thumbnails */}
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView="auto"
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="swiper-thumbs-container w-full px-4"
        >
          {images.map((image, index) => (
            <SwiperSlide key={`${image}-${index}`}>
              <ProductImage
                src={image}
                alt={`${title} miniatura`}
                width={72}
                height={90}
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
