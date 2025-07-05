import { useState } from "react";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import NowShowingSection from "./components/NowShowingSection/NowShowingSection";
import Footer from "./components/Footer";
import UpcomingMovies from "./components/UpcomingMovies/UpcomingMovies";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";

function App() {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <>
      <Toaster />
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/favourties" element={<Favourites />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
