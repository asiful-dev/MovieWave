import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);

  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const fetchNowPlayingMovies = async () => {
    try {
      const { data } = await axios.get("/show/now-playing");

      if (data) setNowPlayingMovies(data.data);
      else toast.error("Failed to fetch now playing movies.");
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUpcomingMovies = async () => {
    try {
      const { data } = await axios.get("/show/upcoming");

      if (data) setUpcomingMovies(data.data);
      else toast.error("Failed to fetch upcoming movies.");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/show/all");
      // console.log("From context api\ndata ", data);

      // console.log("\nshows type ",typeof(data.data));

      if (data) {
        // console.log("\ndhukse");
        // console.log("Array te convert hocche naki dekhtesi ",Array.from(data.data.shows));

        setShows(Array.from(data.data.shows));
      } else toast.error(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get("/movie/all");
      if (data.success) {
        setMovies(data.data);
        toast.success("Movies Fetched Successfully");
      } else toast.error(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchShows();
    // fetchMovies();
    fetchNowPlayingMovies();
    fetchUpcomingMovies();
  }, []);

  const value = {
    axios,
    user,
    navigate,
    image_base_url,
    nowPlayingMovies,
    upcomingMovies,
    genreMap,
    shows,
    getToken,
    fetchShows
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useAppContext };
