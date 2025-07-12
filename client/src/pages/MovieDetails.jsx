import React, { useEffect, useState } from "react";
import { dummyDateTimeData } from "../assets/assests";
import Loader from "../components/Loader";
import BlurCircle from "../components/BlurCricle";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarIcon, StarIcon, ClockIcon, HeartIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import timeFormat from "../lib/timeFormat";
import axios from "axios";
import "swiper/css";
import DateSelect from "../components/DateSelect";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const { image_base_url, navigate, shows } = useAppContext();
  // console.log("From Movie details\n shows ");

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [show, setShow] = useState(null);
  const [clicked, setClicked] = useState(false);

  const fetchRecommendations = async () => {
    try {
      const {data}= await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          },
        }
      );
      console.log(data);
      
      if (data) setRecommendations(data.results.slice(0,4));
    } catch (error) {
      console.error("Failed to fetch movie recommendations \n", error);
    }
  };

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/show/${id}`);
      if (data.success) {
        // console.log(data.data);
        
        setShow(data.data);
        setCast(data.data[0].casts);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const getMovieData = () => {};

  const fetchMovieData = async () => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      };

      const [movieRes, castRes, recRes] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${id}`, options),
        axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, options),
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}/recommendations`,
          options
        ),
      ]);

      setCast(castRes.data.cast);
      setRecommendations(recRes.data.results.slice(0, 4));
      setShow({
        movie: movieRes.data,
        dateTime: dummyDateTimeData,
      });
    } catch (err) {
      console.error("Error fetching movie details:", err);
    }
  };

  useEffect(() => {
    getShow();
    fetchRecommendations();
    // fetchMovieData();
  }, [id]);

  return show ? (
    <div className="mt-25 mb-20 relative min-h-screen text-white px-6 md:px-20 py-20">
      <BlurCircle top="5%" left="10%" />
      <BlurCircle bottom="0" right="0" />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row gap-12 items-center"
      >
        <motion.img
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          src={`${image_base_url}${show[0].poster_path}`}
          alt={show[0].title}
          className="w-72 rounded-xl shadow-xl"
        />

        <div className="flex-1 space-y-4">
          <p className="uppercase text-sm text-primary-400">
            {show[0].original_language.toUpperCase()}
          </p>
          <h1 className="text-4xl font-extrabold text-primary-100">
            {show[0].title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {show[0].vote_average.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4 text-primary-400" />
              {timeFormat(show[0].runtime)}
            </span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4 text-primary-400" />
              {show[0].release_date}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {show[0].overview}
          </p>

          <div className="flex gap-4 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 px-6 py-2 rounded-full text-sm font-semibold transition backdrop-blur-md"
            >
              Watch Trailer
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-primary-700 hover:bg-primary-600 px-6 py-2 rounded-full text-sm font-semibold"
            >
              Buy Tickets
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="transition backdrop-blur-md"
            >
              <HeartIcon className="fill-red-500 text-red-500" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <section className="mt-20">
        <h2 className="text-xl font-semibold mb-6">Movie Casts</h2>
        <Swiper
          direction="horizontal"
          spaceBetween={16}
          slidesPerView={1.5}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          autoplay={{ delay: 4000 }}
          modules={[Autoplay]}
          className="w-full"
        >
          {cast.map((actor) => (
            <SwiperSlide key={actor.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-lg text-center"
              >
                <img
                  src={
                    actor.profile_path
                      ? `${image_base_url}${actor.profile_path}`
                      : "/placeholder.png"
                  }
                  alt={actor.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-2"
                />
                <h4 className="font-semibold">{actor.name}</h4>
                <p className="text-xs text-slate-400">{actor.character}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {Object.keys(show[1]).length > 0 && (
        <DateSelect id={show[0].id} dateTime={show[1]} />
      )}

      <section className="mt-20">
        <h2 className="text-xl font-semibold  mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((rec) => (
            <motion.div
              key={rec.id}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl overflow-hidden shadow-lg bg-black/50"
            >
              <img
                src={`${image_base_url}${rec.backdrop_path || rec.poster_path}`}
                alt={rec.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-semibold">{rec.title}</h4>
                <p className="text-xs text-slate-400">{rec.release_date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  ) : (
    <Loader />
  );
};

export default MovieDetails;
