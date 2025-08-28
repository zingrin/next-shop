"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const slides = [
  {
    image: "https://i.ibb.co/3YpWZP9w/pexels-photo-5864245.jpg",
    title: "Men's Fashion Collection",
    text: "Explore our latest men's casual, formal and party wear dresses.",
    button: "Shop Men's",
  },
  {
    image: "https://i.ibb.co/zTrGDfMr/pexels-photo-19599222.jpg",
    title: "Women's Trendy Dresses",
    text: "From elegant gowns to chic casual wear, discover women's fashion that inspires.",
    button: "Shop Women's",
  },
  {
    image: "https://i.ibb.co/spLFHjdb/pexels-photo-5692997.jpg",
    title: "Kids Wear Collection",
    text: "Comfortable and stylish dresses for kids of all ages, perfect for every occasion.",
    button: "Shop Kids",
  },
];

export default function Hero() {
  return (
    <div className="w-full h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen">
              <Image
                src={slide.image}
                alt={slide.title}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40">
                <h2 className="mb-4 text-3xl font-bold md:text-5xl drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="max-w-2xl text-lg md:text-xl">{slide.text}</p>
                <button className="px-6 py-3 mt-6 transition bg-amber-500 rounded-lg hover:bg-amber-600 font-semibold">
                  {slide.button}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
