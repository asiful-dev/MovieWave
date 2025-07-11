import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import BlurCircle from "../BlurCricle";
import Button from "../Button";
import { Link } from "react-router";
import { useAppContext } from "../../context/AppContext";

const NowShowingSection = () => {
  const { nowPlayingMovies, image_base_url, genreMap } = useAppContext();
  return (
    <div className="px-6 md:px-16 lg:px-20 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-100px" />
        <BlurCircle top="0" left="-100px" />
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:flex-wrap my-4">
        {nowPlayingMovies.slice(0, 6).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="my-10 flex justify-center">
        <Link to="/movies">
          <Button className="w-36 font-medium p-3 rounded-full">
            Show More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NowShowingSection;
