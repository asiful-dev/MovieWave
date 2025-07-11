import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { CalendarIcon, BellIcon, Clock } from "lucide-react";
import BlurCircle from "../BlurCricle";
import { useAppContext } from "../../context/AppContext";






const UpcomingMovies = () => {
 const {image_base_url,upcomingMovies}=useAppContext()
  return (
    <section className="px-6 md:px-16 lg:px-20 py-12 text-white relative">
      <BlurCircle top="-100px" left="50px"/>
      <h2 className="text-lg font-medium mb-6 text-gray-300">
        Upcoming Releases
      </h2>

      <Swiper
        direction="horizontal"
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
        }}
        autoplay={{ delay: 4000 }}
        modules={[Autoplay]}
        className="w-full "
      >
        {upcomingMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <img
                src={`${image_base_url}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold line-clamp-2">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <CalendarIcon className="w-4 h-4 text-blue-400" />
                  {movie.release_date}
                </div>
               
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default UpcomingMovies;
