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
  const [isAdmin, setIsAdmin] = useState(false);

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

  const fetchIsAdmin = async () => {
    try {
      const { data } = await axios.get("/admin/is-admin", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      console.log(data?.data?.isAdmin);

      const isTheUserAdmin = data?.data?.isAdmin;
      setIsAdmin(isTheUserAdmin);

      if (!isTheUserAdmin && location.pathname.startsWith("/admin")) {
        navigate("/");
        toast.error("You are not authorized to access admin dashbaord");
      }
    } catch (error) {
      console.error(error);
    }
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

      if (data) setShows(Array.from(data.data.shows));
      else toast.error(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchShows();

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
    isAdmin,
    getToken,
    fetchShows,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useAppContext };
