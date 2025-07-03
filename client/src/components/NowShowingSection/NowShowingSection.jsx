import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import BlurCircle from "../BlurCricle";
import Button from "../Button";
import { Link } from "react-router";

const NowShowingSection = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const getNowPlayingMovies = async () => {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          },
        }
      );
      setNowPlayingMovies(data.results);
    } catch (error) {
      console.error("Error Fetching Movies!", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
  return (
    <div className="px-6 md:px-16 lg:px-20 overflow-hidden">
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle top="0" right="-100px" />
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:flex-wrap my-4">
        {nowPlayingMovies.slice(0, 6).map((movie) => (
          <MovieCard movie={movie} />
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
