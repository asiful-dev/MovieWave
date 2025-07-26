import React, { useState, useEffect } from "react";
import { Play, Film, Star, Users, Award, Sparkles } from "lucide-react";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Film, title: "Discover", desc: "Latest releases & hidden gems" },
    {
      icon: Star,
      title: "Rate & Review",
      desc: "Share your cinematic opinions",
    },
    { icon: Users, title: "Connect", desc: "Follow actors & directors" },
    { icon: Award, title: "Curate", desc: "Build your perfect watchlist" },
  ];

  const stats = [
    { number: "50+", label: "Movies" },
    { number: "2K+", label: "Users" },
    { number: "950+", label: "Reviews" },
    { number: "50+", label: "Genres" },
  ];

  return (
    <div className="w-full min-h-screen relative text-white overflow-hidden py-15">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1f33] via-[#153456] to-[#0d355d] -z-10">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
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

      {/* Floating Cinema Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "6s" }}
        >
          <Film className="w-12 h-12 text-purple-300 opacity-30" />
        </div>
        <div
          className="absolute top-40 right-20 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "8s" }}
        >
          <Play className="w-16 h-16 text-blue-300 opacity-20" />
        </div>
        <div
          className="absolute bottom-40 left-20 animate-bounce"
          style={{ animationDelay: "4s", animationDuration: "7s" }}
        >
          <Star className="w-10 h-10 text-yellow-300 opacity-25" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Hero Section */}
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-b from-[#13385e] via-[#1a4e85] to-[#115191] bg-clip-text text-transparent animate-pulse">
              MovieWave
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">
              Where Cinema Comes Alive
            </p>
          </div>
        </div>

        {/* Interactive Feature Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeFeature === index;
            return (
              <div
                key={index}
                className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-110 ${
                  isActive ? "scale-110" : ""
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div
                  className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transition-all duration-500 ${
                    isActive
                      ? "bg-white/20 border-purple-400/50 shadow-2xl shadow-purple-500/25"
                      : "hover:bg-white/15"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 mb-4 transition-all duration-500 ${
                      isActive ? "text-purple-400 scale-125" : "text-white/70"
                    }`}
                  />
                  <h3 className="text-lg font-bold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300">{feature.desc}</p>
                </div>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl animate-pulse pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* Main Description Card */}
        <div
          className={`max-w-4xl w-full transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-[#0c1f33] via-[#153456] to-[#0d355d] opacity-75 animate-pulse blur-sm -z-10"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Your Ultimate Cinema Companion
              </h2>

              <div className="space-y-6 text-center">
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                  MovieWave transforms how you experience cinema. Our platform
                  seamlessly blends
                  <span className="text-white font-semibold"> discovery</span>,
                  <span className="text-white font-semibold">
                    {" "}
                    personalization
                  </span>
                  , and
                  <span className="text-white font-semibold">
                    {" "}
                    community
                  </span>{" "}
                  into one extraordinary journey.
                </p>

                <p className="text-base md:text-lg text-gray-300">
                  From browsing the latest blockbusters to uncovering indie
                  masterpieces, managing your watchlist to connecting with
                  fellow cinephiles – we've created a universe where every movie
                  lover finds their perfect match.
                </p>

                <div className="flex flex-wrap justify-center gap-4 pt-6">
                  <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 border border-purple-500/30">
                    High-Quality Trailers
                  </span>
                  <span className="px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 border border-blue-500/30">
                    Smart Recommendations
                  </span>
                  <span className="px-4 py-2 bg-pink-500/20 rounded-full text-pink-300 border border-pink-500/30">
                    Social Features
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105">
                <h3 className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-b from-white to-gray-400 bg-clip-text mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-400 uppercase tracking-wider text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`mt-16 transform transition-all duration-1000 delay-900 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-center text-gray-400 italic text-lg max-w-2xl">
            "Crafted by passionate cinema enthusiasts, designed for the ultimate
            entertainment experience."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
