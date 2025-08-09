import React, { useEffect, useState } from "react";
import { MapPin, Film, CalendarDays, Video } from "lucide-react";
import { assests } from "../assets/assests";

const theaterImage1 = assests.movieTheaterImg;
const theaterImage2 = assests.movieTheaterImg2;
const theaterImage3 = assests.movieTheaterImg3;

const mockTheaters = [
  {
    name: "Star Cineplex",
    location: "Bashundhara City, Dhaka",
    shows: ["Inception", "Oppenheimer", "Shazam"],
    image: theaterImage1,
  },
  {
    name: "Blockbuster Cinemas",
    location: "Jamuna Future Park, Dhaka",
    shows: ["Jawan", "Dune", "Fast X"],
    image: theaterImage2,
  },
  {
    name: "Silver Screen",
    location: "Chattogram GEC",
    shows: ["The Batman", "Top Gun: Maverick"],
    image: theaterImage3,
  },
];

const Theaters = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#162e49] text-white py-[10rem] px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text animate-pulse">
          Theaters Near You
        </h1>
        <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
          Discover theaters where your favorite movies are playing — with
          showtimes, featured films, and immersive experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {mockTheaters.map((theater, index) => (
          <div
            key={index}
            className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-4">
              <img
                src={theater.image}
                alt="Theater"
                className="rounded-xl object-cover h-40 w-full shadow-md"
              />
            </div>
            <h3 className="text-2xl font-bold flex items-center gap-2 text-white mb-2">
              <Film className="w-5 h-5 text-primary-300" /> {theater.name}
            </h3>
            <p className="flex items-center gap-2 text-gray-400 mb-4">
              <MapPin className="w-4 h-4 text-primary-500" />
              {theater.location}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-24">
        <p className="text-gray-400 text-lg italic mb-4">
          Can’t find your favorite cinema? Let us know!
        </p>
        <button className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-full transition duration-300 shadow-md hover:shadow-blue-400/30">
          Suggest a Theater
        </button>
      </div>
    </div>
  );
};

export default Theaters;
