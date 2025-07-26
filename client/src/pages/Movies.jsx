import React, { useState, useEffect } from "react";
import axios from "axios";
import BlurCircle from "../components/BlurCricle";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
const Movies = () => {
  const { nowPlayingMovies,shows } = useAppContext();
  return nowPlayingMovies ? (
    <div className="w-full px-6 md:px-16 lg:px-20 overflow-hidden mb-10 "> 
      <div className="flex items-center justify-between pt-[10rem] pb-10 ">
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:flex-wrap my-4">
        {shows.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Movies;
