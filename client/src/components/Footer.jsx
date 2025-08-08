import React from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Film,
  Ticket,
  Users,
  ArrowUp,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    company: [
      { label: "About Us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "News", to: "/news" },
    ],
    services: [
      { label: "Movie Tickets", to: "/movies" },
      { label: "Gift Cards", to: "/movies" },
      { label: "Private Screenings", to: "/movies" },
    ],
    support: [
      { label: "Help Center", to: "/help" },
      { label: "Contact Us", to: "/contact" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy-policy" },
    ],
  };

  const contactInfo = [
    { icon: Phone, label: "+1 (555) 123-4567", href: "tel:+15551234567" },
    {
      icon: Mail,
      label: "hello@moviewave.com",
      href: "mailto:hello@moviewave.com",
    },
    {
      icon: MapPin,
      label: "123 Cinema Street, Movie City, MC 12345",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com",
      label: "Instagram",
    },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company",
      label: "LinkedIn",
    },
  ];

  return (
    <>
      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-4 sm:right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full bg-gradient-to-b from-[#0c1f33] via-[#153456] to-[#0d355d] text-white/80 overflow-hidden"
      >
        {/* Main Footer Content */}
        <div className="px-4 sm:px-6 md:px-12 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto">
            {/* Mobile-First Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Brand Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="md:col-span-2 lg:col-span-1 text-center md:text-left"
              >
                <motion.img
                  src="/logo.png"
                  alt="MovieWave Logo"
                  className="w-40 sm:w-48 mb-4 mx-auto md:mx-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                <p className="text-sm sm:text-base text-white/60 mb-6 leading-relaxed max-w-sm mx-auto md:mx-0">
                  Experience movies like never before. Secure seats. Seamless
                  booking. Stay entertained with us.
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 bg-white/10 hover:bg-blue-600/30 rounded-full transition-colors duration-300 group"
                    >
                      <social.icon
                        size={18}
                        className="text-white group-hover:text-blue-300"
                      />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links Sections */}
              {Object.entries(footerLinks).map(([category, links], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center md:text-left"
                >
                  <h4 className="text-white font-semibold text-sm sm:text-base mb-4 capitalize">
                    {category === "company"
                      ? "Company"
                      : category === "services"
                      ? "Services"
                      : "Support"}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.to}
                          onClick={() => scrollTo(0, 0)}
                          className="text-sm text-white/60 hover:text-white transition-colors duration-300 hover:underline underline-offset-2 inline-flex items-center gap-1 group"
                        >
                          {link.label}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="border-t border-white/10 px-4 sm:px-6 md:px-12 py-6"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-white/40 text-center sm:text-left">
              &copy; 2025{" "}
              <a
                href="https://movie-wave-red.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline underline-offset-2 transition-colors duration-300"
              >
                MovieWave
              </a>
              . All rights reserved.
            </p>

            <div className="flex items-center gap-4 text-xs text-white/40">
              <Link
                to="/sitemap"
                className="hover:text-white transition-colors"
              >
                Sitemap
              </Link>
              <span>•</span>
              <Link
                to="/accessibility"
                className="hover:text-white transition-colors"
              >
                Accessibility
              </Link>
              <span>•</span>
              <Link
                to="/cookies"
                className="hover:text-white transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.footer>
    </>
  );
};

export default Footer;
