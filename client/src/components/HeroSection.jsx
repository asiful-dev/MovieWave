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
 const {nowPlayingMovies,image_base_url,genreMap}=useAppContext();
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
            <div
              className="w-full h-full bg-cover bg-center flex items-center px-8 md:px-16 text-white"
              style={{
                backgroundImage: `url(${image_base_url}${movie.backdrop_path})`,
              }}
            >
              <div className="max-w-xl bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg backdrop-blur-sm">
                <h2 className="text-4xl md:text-4xl font-extrabold mb-4 flex items-center gap-2">
                  <FilmIcon className="w-7 h-7 text-blue-400" /> {movie.title}
                </h2>

                <div className="mb-2 text-md flex items-center gap-4 flex-wrap text-slate-300">
                  <span className="flex items-center gap-x-2">
                    <InfoIcon className="w-4 h-4 text-blue-300" />
                    {movie.genre_ids.map((id) => genreMap[id]).join(" | ")}
                  </span>
                  <span className="flex items-center gap-x-2">
                    <CalendarIcon className="w-4 h-4 text-blue-300" />
                    {movie.release_date}
                  </span>
                </div>

                <p className="text-sm mb-5 text-slate-200 line-clamp-4 leading-relaxed">
                  {truncateText(movie.overview)}
                </p>

                <Link
                  to="/movies"
                  className="inline-block bg-[#2196f3] hover:bg-[#1e88e5] text-white px-6 py-2 rounded-full text-sm font-medium transition duration-300 shadow-md hover:shadow-blue-400/30 group"
                >
                  <span className="flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                    Explore Movies <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
