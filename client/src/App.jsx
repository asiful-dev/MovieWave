import { useState } from "react";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import NowShowingSection from "./components/NowShowingSection/NowShowingSection";
import Footer from "./components/Footer";
import BrowseByGenre from "./components/BrowseByGenre/BrowseByGenre";
import UpcomingMovies from "./components/UpcomingMovies/UpcomingMovies";

function App() {
  return (
    <>
      <NavBar />
      <HeroSection/>
      <NowShowingSection/>
      <UpcomingMovies/>
      <Footer/>
    </>
  );
}

export default App;
