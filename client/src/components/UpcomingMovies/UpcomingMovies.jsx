import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import {
  CalendarIcon,
  BellIcon,
  Clock,
  ArrowRight,
  HeartIcon,
  StarIcon,
  PlayIcon,
} from "lucide-react";
import BlurCircle from "../BlurCricle";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard";

const UpcomingMovies = () => {
  const { image_base_url, upcomingMovies } = useAppContext();

  return (
    <section className="px-4 sm:px-6 md:px-16 lg:px-20 py-8 sm:py-12 text-white relative overflow-hidden">
      <BlurCircle top="-100px" left="50px" />

      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
            Upcoming Releases
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Don't miss these highly anticipated movies ❗
          </p>
        </div>
      </div>

      <Swiper
        direction="horizontal"
        spaceBetween={15}
        slidesPerView={1.8}
        breakpoints={{
          480: { slidesPerView: 2.2, spaceBetween: 16 },
          640: { slidesPerView: 2.5, spaceBetween: 16 },
          768: { slidesPerView: 3.2, spaceBetween: 20 },
          1024: { slidesPerView: 4.2, spaceBetween: 20 },
          1280: { slidesPerView: 5.2, spaceBetween: 24 },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        className="w-full !overflow-visible"
      >
        {upcomingMovies.slice(0, 9).map((movie) => (
          <SwiperSlide className="w-full">
            <MovieCard key={movie.id} movie={movie} isUpcoming={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default UpcomingMovies;
