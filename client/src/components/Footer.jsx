import React from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
// from-[#0c1f33] via-[#153456] to-[#1a548e]
const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full bg-gradient-to-b from-[#0c1f33] via-[#153456] to-[#0d355d] text-white/80 px-6 md:px-12 py-16 mt-20"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.img
          src="/logo.png"
          alt="logo"
          className="w-50 mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />

        <motion.p
          className="text-sm text-white/60 mb-6 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Experience movies like never before. Secure seats. Seamless booking.
          Stay entertained with us.
        </motion.p>

        <motion.div
          className="flex items-center gap-5 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
            >
              <Icon size={20} className="text-white" />
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          className="text-xs text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          &copy; 2025{" "}
          <a
            href="https://prebuiltui.com"
            className="hover:text-white underline underline-offset-2"
          >
            MovieWave
          </a>
          . All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;
