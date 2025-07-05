import React from "react";
import HeroSection from "../components/HeroSection";
import NowShowingSection from "../components/NowShowingSection/NowShowingSection";
import UpcomingMovies from "../components/UpcomingMovies/UpcomingMovies";

const Home = () => {
  return (
    <>
      <HeroSection />
      <NowShowingSection />
      <UpcomingMovies />
    </>
  );
};

export default Home;
