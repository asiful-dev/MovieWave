import React, { useState, useEffect } from "react";
import { Users, Briefcase, Rocket, Sparkles, Star } from "lucide-react";

const Careers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const positions = [
    {
      title: "Frontend Developer",
      location: "Remote",
      desc: "Build sleek user interfaces with React and TailwindCSS.",
    },
    {
      title: "Content Curator",
      location: "Dhaka, BD",
      desc: "Curate and categorize high-quality movie data and reviews.",
    },
    {
      title: "Social Media Manager",
      location: "Remote",
      desc: "Drive community engagement across platforms.",
    },
    {
      title: "AI/ML Engineer",
      location: "Hybrid",
      desc: "Enhance recommendations using machine learning models.",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % positions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden py-[10rem] px-4">
      {/* Animated Background Sparkles */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1f33] via-[#153456] to-[#0d355d] -z-10">
        <div className="absolute inset-0 opacity-20">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              <Sparkles className="w-2 h-2 text-yellow-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <div
        className={`text-center mb-12 transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-[#34b1fd] to-[#167bdf] bg-clip-text text-transparent animate-pulse">
          Join MovieWave
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mt-4 max-w-xl mx-auto">
          Empowering film lovers. Innovating movie discovery. Building the future of entertainment.
        </p>
      </div>

      {/* Positions Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16 transform transition-all duration-1000 delay-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {positions.map((job, index) => (
          <div
            key={index}
            className={`bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg transition-all duration-500 hover:scale-105 ${
              activeIndex === index ? "ring-2 ring-blue-400/30" : ""
            }`}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div className="flex items-center gap-4 mb-4">
              <Briefcase className="w-6 h-6 text-blue-300" />
              <h3 className="text-xl font-bold text-white">{job.title}</h3>
            </div>
            <p className="text-gray-300 mb-2">{job.desc}</p>
            <p className="text-sm text-blue-400 font-medium">{job.location}</p>
          </div>
        ))}
      </div>

      {/* Perks Section */}
      <div className="max-w-4xl mx-auto text-center space-y-10">
        <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Why Work With Us?
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10 w-60 hover:scale-105 transition">
            <Rocket className="w-6 h-6 text-purple-300 mb-2" />
            <p className="text-white font-medium">Fast-growing Team</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10 w-60 hover:scale-105 transition">
            <Users className="w-6 h-6 text-pink-300 mb-2" />
            <p className="text-white font-medium">Creative Culture</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10 w-60 hover:scale-105 transition">
            <Star className="w-6 h-6 text-yellow-300 mb-2" />
            <p className="text-white font-medium">Impactful Work</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <p className="text-gray-400 italic text-lg">
          “Passionate about movies and tech? Let’s build something magical together.” 🎬
        </p>
        <button className="mt-6 px-6 py-3 bg-[#2196f3] hover:bg-[#167bdf] rounded-full text-white text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
          See Open Positions
        </button>
      </div>
    </div>
  );
};

export default Careers;
