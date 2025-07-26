import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { CalendarIcon, BellIcon, Clock, ArrowRight, HeartIcon, StarIcon, PlayIcon } from "lucide-react";
import BlurCircle from "../BlurCricle";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

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
        spaceBetween={12}
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
        {upcomingMovies.slice(0,9).map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <div className="group cursor-pointer">
              <div className="md:h-[30rem] relative bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-blue-500/20">
                {/* Movie Poster */}
                <div className="relative overflow-hidden">
                  <img
                    src={`${image_base_url}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading={index < 4 ? "eager" : "lazy"}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Coming Soon badge */}
                  <div className="absolute top-2 left-2 bg-blue-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                    Coming Soon
                  </div>

                  {/* Quick view overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <PlayIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-2 leading-tight group-hover:text-blue-300 transition-colors duration-300">
                    {movie.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                    <span>
                      {new Date(movie.release_date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  {/* Rating if available */}
                  {movie.vote_average > 0 && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                      <span className="text-slate-300">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  )}

                  {/* Wishlist button for mobile */}
                  <button className="w-full sm:hidden bg-blue-600/80 hover:bg-blue-600 text-white py-2 rounded-lg text-xs font-medium transition-colors duration-300 flex items-center justify-center gap-2 mt-3">
                    <HeartIcon className="w-3 h-3" />
                    Add to Wishlist
                  </button>
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
