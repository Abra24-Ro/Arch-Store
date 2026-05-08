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

interface SlideShowProps {
  images: string[];
  title: string;
  className?: string;
}

export const SlideShow = ({ images, title, className }: SlideShowProps) => {
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
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="swiper-main flex-1"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>

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
          {images.map((image) => (
            <SwiperSlide key={image}>
              <Image
                src={`/products/${image}`}
                alt={`${title} miniatura`}
                width={72}
                height={90}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
