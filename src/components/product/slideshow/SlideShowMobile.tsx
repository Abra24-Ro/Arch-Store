"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slideshow.css";

interface SlideShowProps {
  images: string[];
  title: string;
  className?: string;
}

export const SlideShowMobile = ({
  images,
  title,
  className,
}: SlideShowProps) => {
  return (
    <div className={`flex flex-col h-full bg-[#EFEDE9] ${className ?? ""}`}>
      {/* imagen principal */}
      <Swiper
        style={
          {
            width: "100%",
            height: "60vw",
            minHeight: "280px",
            maxHeight: "480px",
            "--swiper-navigation-color": "#1a1a1a",
            "--swiper-pagination-color": "#1a1a1a",
          } as React.CSSProperties
        }
        pagination={{ clickable: true }}
        spaceBetween={0}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        modules={[FreeMode, Navigation, Autoplay, Pagination]}
        className="swiper-main flex-1"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              width={500}
              height={500}
              className="w-full h-full object-cover"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
