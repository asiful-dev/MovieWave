import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { CalendarIcon, BellIcon, Clock } from "lucide-react";
import BlurCircle from "../BlurCricle";

const image_base = "https://image.tmdb.org/t/p/w500";

const getCountdown = (releaseDate) => {
  const now = new Date();
  const target = new Date(releaseDate);
  const diff = Math.max(target - now, 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `${days} day${days !== 1 ? "s" : ""} left`;
};

const UpcomingMovies = () => {
  const [upcoming, setUpcoming] = useState([]);

  const fetchUpcoming = async () => {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          },
        }
      );
      setUpcoming(data.results.slice(0, 10)); // Show top 10
    } catch (error) {
      console.error("Error fetching upcoming movies", error);
    }
  };

  useEffect(() => {
    fetchUpcoming();
  }, []);

  return (
    <section className="px-6 md:px-16 lg:px-36 py-12 text-white relative">
      <BlurCircle top="-100px" left="50px"/>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
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
        className="w-full"
      >
        {upcoming.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
              <img
                src={`${image_base}${movie.poster_path}`}
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
