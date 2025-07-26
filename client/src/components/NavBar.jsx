import React, { useState } from "react";
import { assests } from "../assets/assests.js";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, ShieldUserIcon, TicketPlus, XIcon } from "lucide-react";
import Button from "./Button.jsx";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext.jsx";

const NavBar = () => {
  const { isAdmin } = useAppContext();
  const navItems = ["Home", "Movies", "Theaters", "News"];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between w-full px-6 py-2 rounded-full text-white text-sm fixed top-0 left-0 z-50 bg-transparent">
      <Link
        to="/"
        onClick={() => {
          scrollTo(0, 0);
        }}
      >
        <img
          src={assests.favicon}
          alt=""
          className="w-20 transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </Link>

      <div className="hidden md:flex items-center gap-6 ml-7 backdrop-blur-3xl bg-white/10 px-6 py-4 rounded-full ">
        {navItems.map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            onClick={() => {
              scrollTo(0, 0);
            }}
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
        {/* Login Button */}
        {!user ? (
          <Button
            onClick={openSignIn}
            className="px-6 py-2 rounded-full text-sm font-medium transition duration-300 transform hover:-translate-y-1 hover:shadow-md hover:bg-primary-700/60 shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            bgColor="bg-primary-700"
            textColor="text-white"
          >
            Login
          </Button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                onClick={() => navigate("/my-bookings")}
                label="My Bookings"
                labelIcon={<TicketPlus className="w-[1rem]" />}
              />

              {isAdmin ? (
                <UserButton.Action
                  label="Admin Panel"
                  labelIcon={<ShieldUserIcon className="w-[1rem]" />}
                  onClick={() => navigate("/admin")}
                />
              ) : (
                ""
              )}
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>

      <button
        onClick={toggleMobileMenu}
        className="md:hidden text-white bg-white/20 p-4 rounded-lg"
      >
        <MenuIcon />
      </button>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center bg-black/70 backdrop-blur-lg px-6 py-10">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-6 right-6 text-white"
          >
            <XIcon className="w-6 h-6" />
          </button>

          {/* User Profile Section - Top Emphasis */}
          <div className="flex flex-col items-center gap-4 mt-8 mb-12">
            {!user ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <Button
                  onClick={openSignIn}
                  className="px-8 py-3 rounded-full text-base font-medium transition duration-300 transform hover:-translate-y-1 hover:shadow-md hover:bg-primary-700/60 shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  bgColor="bg-primary-700"
                  textColor="text-white"
                >
                  Login
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="scale-150 mb-2">
                  <UserButton>
                    <UserButton.MenuItems>
                      <UserButton.Action
                        onClick={() => navigate("/my-bookings")}
                        label="My Bookings"
                        labelIcon={<TicketPlus className="w-[1rem]" />}
                      />
                      {isAdmin ? (
                        <UserButton.Action
                          label="Admin Panel"
                          labelIcon={<ShieldUserIcon className="w-[1rem]" />}
                          onClick={() => navigate("/admin")}
                        />
                      ) : (
                        ""
                      )}
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
                <p className="text-white text-lg font-medium">
                  {user.fullName || user.username || "User"}
                </p>
                <Button
                  onClick={() => navigate("/my-bookings")}
                  className="px-6 py-2 rounded-full text-sm font-medium transition duration-300 transform hover:-translate-y-1 hover:shadow-md bg-white/10 border border-white/20 hover:bg-white/20"
                  bgColor=""
                  textColor="text-white"
                >
                  My Bookings
                </Button>
                {isAdmin && (
                  <Button
                    onClick={() => navigate("/admin")}
                    className="px-6 py-2 rounded-full text-sm font-medium transition duration-300 transform hover:-translate-y-1 hover:shadow-md bg-white/10 border border-white/20 hover:bg-white/20"
                    bgColor=""
                    textColor="text-white"
                  >
                    Admin Panel
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <div className="flex flex-col items-center gap-6 mb-8">
            {navItems.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                onClick={toggleMobileMenu}
                className="text-white text-xl font-medium hover:text-blue-400 transition capitalize tracking-wide"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
