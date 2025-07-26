import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarIcon, FilmIcon, InfoIcon } from "lucide-react";
import truncateText from "../utils/truncateText";
import { useAppContext } from "../context/AppContext";

const HeroSection = () => {
  const { nowPlayingMovies, image_base_url, genreMap } = useAppContext();
  //  console.log(nowPlayingMovies);

  return (
    <div className="w-full h-screen relative">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {nowPlayingMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            {/* Desktop/Tablet View - Use backdrop */}
            <div className="hidden sm:block w-full h-full">
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat flex items-center px-6 md:px-8 lg:px-16 text-white"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 70%), url(${image_base_url}${movie.backdrop_path})`,
                }}
              >
                <div className="max-w-md md:max-w-lg lg:max-w-xl bg-white/10 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-lg">
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center gap-2">
                    <FilmIcon className="w-8 h-7 text-blue-400" /> {movie.title}
                  </h2>

                  <div className="mb-4 text-sm md:text-base flex items-center gap-4 flex-wrap text-slate-300">
                    <span className="flex items-center gap-x-2">
                      <InfoIcon className="w-4 h-4 text-blue-300" />
                      {movie.genre_ids.map((id) => genreMap[id]).join(" | ")}
                    </span>
                    <span className="flex items-center gap-x-2">
                      <CalendarIcon className="w-4 h-4 text-blue-300" />
                      {movie.release_date}
                    </span>
                  </div>

                  <p className="text-sm md:text-base mb-5 text-slate-200 line-clamp-4 leading-relaxed">
                    {truncateText(movie.overview)}
                  </p>

                  <Link
                    to="/movies"
                    className="inline-block bg-[#2196f3] hover:bg-[#1e88e5] text-white px-6 py-3 rounded-full text-sm font-medium transition duration-300 shadow-md hover:shadow-blue-400/30 group"
                  >
                    <span className="flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                      Explore Movies <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile View - Use poster with creative layout */}
            <div className="block sm:hidden w-full h-full relative overflow-hidden">
              {/* Background with poster */}
              <div className="absolute inset-0">
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-110 blur-sm"
                  style={{
                    backgroundImage: `url(${image_base_url}${movie.poster_path})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-4 pb-8 text-white">
                {/* Poster thumbnail */}
                <div className="mb-6 flex justify-center">
                  <img
                    src={`${image_base_url}${movie.poster_path}`}
                    alt={movie.title}
                    className="w-32 h-48 object-cover rounded-lg shadow-xl ring-2 ring-white/20"
                  />
                </div>

                {/* Movie info */}
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-extrabold leading-tight">
                    {movie.title}
                  </h2>

                  <div className="flex flex-col gap-2 text-sm text-slate-300">
                    <span className="flex items-center justify-center gap-x-2">
                      <InfoIcon className="w-3 h-3 text-blue-300" />
                      <span className="truncate max-w-xs">
                        {movie.genre_ids
                          .map((id) => genreMap[id])
                          .slice(0, 2)
                          .join(" | ")}
                      </span>
                    </span>
                    <span className="flex items-center justify-center gap-x-2">
                      <CalendarIcon className="w-3 h-3 text-blue-300" />
                      {movie.release_date}
                    </span>
                  </div>

                  <p className="text-sm text-slate-200 line-clamp-3 leading-relaxed px-2">
                    {truncateText(movie.overview, 120)}
                  </p>

                  <Link
                    to="/movies"
                    className="inline-block bg-[#2196f3] hover:bg-[#1e88e5] text-white px-6 py-3 rounded-full text-sm font-medium transition duration-300 shadow-md active:scale-95 mt-4"
                  >
                    <span className="flex items-center gap-2">
                      Explore Movies <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
