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
import Home from "./pages/Home";
import { useAppContext } from "./context/AppContext";
import { SignIn } from "@clerk/clerk-react";
import Dashboard from "./pages/admin/Dashboard";
import AddShows from "./pages/admin/AddShows";
import ListShows from "./pages/admin/ListShows";
import ListBookings from "./pages/admin/ListBookings";
import AdminLayout from "./pages/admin/AdminLayout";
import Loader from "./components/Loader";
import News from "./pages/News";
import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";
import Theaters from "./pages/Theaters";

function App() {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  const AdminRoute = () => {
    const { user } = useAppContext() || {};

    if (!user)
      return (
        <div className="flex-1 px-4 py-10 md:px-10 h-auto overflow-y-auto">
          <SignIn fallbackRedirectUrl={"/admin"} />
        </div>
      );
    return <AdminLayout />;
  };

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
        <Route path="/loading/:nextUrl" element={<Loader />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/theaters" element={<Theaters />} />


        {/* Admin routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
