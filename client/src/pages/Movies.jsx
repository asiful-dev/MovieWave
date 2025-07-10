import React, { useState, useEffect } from "react";
import axios from "axios";
import BlurCircle from "../components/BlurCricle";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader"
const Movies = () => {
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
  return nowPlayingMovies? (
    <div className="px-6 md:px-16 lg:px-20 overflow-hidden ">
      <div className="relative flex items-center justify-between pt-[10rem] pb-10 ">
        <BlurCircle top="0" right="-100px" />
        <BlurCircle top="0" left="-100px" />
        <p className="text-gray-300 font-medium text-lg">Now Showing</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:flex-wrap my-4">
        {nowPlayingMovies.slice(0, 18).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="relative flex items-center justify-between pt-20 pb-10">
        <BlurCircle bottom="0" right="-100px" />
        <BlurCircle bottom="0" left="-100px" />
      </div>

    </div>
  ):(<Loader/>)
};

export default Movies;
