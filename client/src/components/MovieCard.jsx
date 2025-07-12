import React from "react";
import { motion } from "framer-motion";
import { CalendarIcon, GlobeIcon, StarIcon } from "lucide-react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const MovieCard = ({ movie }) => {
  const { image_base_url, genreMap, navigate } = useAppContext();
  return (
    <motion.div
      whileHover={{
        rotateX: 5,
        rotateY: -5,
        scale: 1.03,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="relative w-full h-[30rem] max-w-sm rounded-xl overflow-hidden shadow-lg cursor-pointer group perspective-1000"
    >
      <img
        src={`${image_base_url}${movie.poster_path}`}
        alt={movie.title}
        className="w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 flex flex-col justify-end">
        <h3 className="text-lg font-semibold text-white mb-2">{movie.title}</h3>

        <div className="text-sm text-slate-300 flex flex-wrap gap-x-4 gap-y-1 mb-1">
          <span className="flex items-center gap-1">
            <GlobeIcon className="w-4 h-4 text-blue-400" />
            {movie.original_language.toUpperCase()}
          </span>
          <span className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4 text-blue-400" />
            {movie.release_date}
          </span>
          <span className="flex items-center gap-1">
            {movie.genres
              .slice(0, 2)
              .map((genre) => genre.name)
              .join(", ")}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Animated Button (always visible, bounces on hover) */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              className="px-4 py-1.5 rounded-full text-xs font-medium hover:bg-primary-700/60 transition"
              onClick={() => {
                navigate(`/movies/${movie.id}`);
                scrollTo(0, 0);
              }}
            >
              Book Now
            </Button>
          </motion.div>

          <span className="flex items-center gap-1 text-sm text-yellow-400 font-semibold">
            <StarIcon className="w-4 h-4 fill-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
