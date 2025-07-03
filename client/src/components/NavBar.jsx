import React, { useState } from "react";
import { assests } from "../assets/assests.js";
import { Link } from "react-router-dom";
import { XIcon } from "lucide-react";
import Button from "./Button.jsx";

const NavBar = () => {
  const navItems = ["Home", "Movies", "Theaters", "Releases", "Favourites"];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between mx-4 max-md:w-full max-md:justify-between px-6 py-2 rounded-full text-white text-sm relative">
      <Link to="/">
        <img
          src={assests.favicon}
          alt=""
          className="w-20 transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </Link>

      <div className="hidden md:flex items-center gap-6 ml-7">
        {navItems.map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className="relative overflow-hidden h-6 group capitalize"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              {item}
            </span>
            <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
              {item}
            </span>
          </Link>
        ))}
      </div>

      <div className="hidden ml-14 md:flex items-center gap-4">
        <Button
          className="border border-slate-600 px-4 py-2 rounded-full text-sm font-medium transition"
          bgColor="bg-transparent"
          hoverColor="bg-slate-800"
          textColor="text-white"
        >
          Contact
        </Button>

        {/* Login Button */}
        <Button
          className="px-6 py-2 rounded-full text-sm font-medium transition duration-300 transform hover:-translate-y-1 hover:shadow-md shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          bgColor="bg-primary-700"
          hoverColor="bg-primary-700/60"
          textColor="text-white"
        >
          Login
        </Button>
      </div>

      <button onClick={toggleMobileMenu} className="md:hidden text-white">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-black/70 backdrop-blur-lg px-6 py-10">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-6 right-6 text-white"
          >
            <XIcon className="w-6 h-6" />
          </button>

          {navItems.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              onClick={toggleMobileMenu}
              className="text-white text-lg font-medium hover:text-blue-400 transition"
            >
              {item}
            </Link>
          ))}

          <div className="mt-4 flex flex-col items-center gap-3 w-36 px-4">
            <Button
              className="w-36 border border-slate-600 px-4 py-2 rounded-full text-sm font-medium transition"
              bgColor="bg-transparent"
              hoverColor="bg-slate-800"
              textColor="text-white"
            >
              Contact
            </Button>

            {/* Login Button */}
            <Button
              className="w-36 px-6 py-2 rounded-full text-sm font-medium transition duration-300 transform hover:-translate-y-1 hover:shadow-md shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
              bgColor="bg-primary-700"
              hoverColor="bg-primary-700/60"
              textColor="text-white"
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
