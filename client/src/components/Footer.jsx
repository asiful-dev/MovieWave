import React from "react";
import { assests } from "../assets/assests";
import BlurCircle from "./BlurCricle";
import { MailIcon, PhoneCallIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-8 px-6 pt-12 pb-4 md:px-16 lg:px-36 w-full bg-background-dark text-gray-300 border-t border-white/10 relative overflow-hidden ">
      {/* Optional Blur Gradient Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80vw] h-64 bg-gradient-to-tr from-primary-700/30 via-primary-500/10 to-transparent blur-3xl opacity-20 -z-10" />

      <div className="flex flex-col md:flex-row justify-between w-full gap-10 pb-14">
        {/* Logo & About */}
        <div className="md:max-w-md">
          <img
            className="w-44 h-auto"
            src={assests.logo}
            alt="MovieWave Logo"
          />
          <p className="mt-6 text-sm leading-relaxed text-gray-400">
            Discover and book tickets for the latest blockbusters. Built with
            love for movie lovers and dreamers alike.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
              alt="Google Play"
              className="h-10 w-auto border border-gray-600 rounded-lg hover:scale-105 transition"
            />
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
              alt="App Store"
              className="h-10 w-auto border border-gray-600 rounded-lg hover:scale-105 transition"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col sm:flex-row items-start md:justify-end gap-16 md:gap-32">
          <div>
            <h2 className="font-semibold text-lg mb-4 text-white">Company</h2>
            <ul className="text-sm space-y-2">
              {["Home", "About us", "Contact us", "Privacy policy"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-primary-500 transition duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-4 text-white">
              Get in touch
            </h2>
            <div className="text-sm space-y-2 text-gray-400">
              <p className="flex items-center gap-1">
                <span>
                  <PhoneCallIcon className="w-4" />
                </span>{" "}
                +1-234-567-890
              </p>
              <p className="flex items-center gap-1">
                <span>
                  <MailIcon className="w-4" />
                </span>{" "}
                contact@example.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="pt-6 text-center text-xs text-gray-500 border-t border-gray-700">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-primary-500">asiful.dev</span>. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
