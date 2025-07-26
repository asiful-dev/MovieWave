import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarIcon,
  GlobeIcon,
  StarIcon,
  PlayIcon,
  HeartIcon,
  InfoIcon,
} from "lucide-react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const MovieCard = ({ movie, index = 0, size = "default" }) => {
  const { image_base_url, genreMap, navigate } = useAppContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Responsive sizing
  const sizeClasses = {
    small: "h-80 sm:h-96",
    default: "h-96 sm:h-[28rem] md:h-[30rem]",
    large: "h-[28rem] sm:h-[32rem] md:h-[36rem]",
  };

  const handleCardClick = (e) => {
    // Prevent navigation if clicking on interactive elements
    if (e.target.closest("button") || e.target.closest("a")) return;
    navigate(`/movies/${movie._id}`);
    scrollTo(0, 0);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        rotateX: 2,
        rotateY: -2,
        scale: 1.02,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 18,delay: index * 0.1  }}
      onClick={handleCardClick}
      className={`
        relative w-full ${sizeClasses[size]} max-w-sm mx-auto 
        rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
        cursor-pointer group perspective-1000 bg-gray-900/50 backdrop-blur-sm
        transition-shadow duration-300 hover:shadow-blue-500/20
      `}
    >
      {/* Image Container */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
        )}

        <img
          src={`${image_base_url}${movie.poster_path}`}
          alt={movie.title}
          className={`
            w-full h-full object-cover transition-all duration-300 
            group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}
          `}
          onLoad={() => setImageLoaded(true)}
          loading={index < 6 ? "eager" : "lazy"}
        />

        {/* Rating badge */}
        {movie.vote_average > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 bg-yellow-500/90 backdrop-blur-sm text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
          >
            <StarIcon className="w-3 h-3 fill-current" />
            {movie.vote_average.toFixed(1)}
          </motion.div>
        )}

      

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end">
          {/* Movie Title */}
          <motion.h3
            className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 line-clamp-2 leading-tight"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {movie.title}
          </motion.h3>

          {/* Movie Details */}
          <div className="text-xs sm:text-sm text-slate-300 space-y-1 mb-3">
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
              <span className="flex items-center gap-1">
                <GlobeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                {movie.original_language.toUpperCase()}
              </span>
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>

            {/* Genres */}
            <div className="flex items-center gap-1">
              <InfoIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
              <span className="line-clamp-1">
                {movie.genres
                  ? movie.genres
                      .slice(0, 2)
                      .map((genre) => genre.name)
                      .join(", ")
                  : movie.genre_ids
                  ? movie.genre_ids
                      .slice(0, 2)
                      .map((id) => genreMap[id])
                      .filter(Boolean)
                      .join(", ")
                  : ""}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-2">
            {/* Primary Action Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button
                className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 flex items-center justify-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/movies/${movie._id}`);
                  scrollTo(0, 0);
                }}
              >
                <PlayIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Book Now</span>
                <span className="sm:hidden">Book</span>
              </Button>
            </motion.div>

            {/* Secondary Action - More Info */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                // Handle more info action
              }}
              className="hidden sm:block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-300"
            >
              <InfoIcon className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Mobile-only bottom sheet indicator */}
          <div className="sm:hidden mt-2 flex justify-center">
            <div className="w-8 h-1 bg-white/30 rounded-full" />
          </div>
        </div>

        {/* Desktop hover overlay */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="hidden sm:block absolute inset-0 bg-blue-600/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          />
        </AnimatePresence>
      </div>

      {/* Quick preview overlay for desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="hidden lg:block absolute inset-x-0 -bottom-2 bg-black/90 backdrop-blur-lg p-3 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
      >
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {movie.overview || "No description available."}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MovieCard;
