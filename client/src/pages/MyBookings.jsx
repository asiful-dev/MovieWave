import React, { useEffect, useState } from "react";
import { assests, dummyBookingData } from "../assets/assests";
import Loader from "../components/Loader";
import BlurCircle from "../components/BlurCricle";
import { useAppContext } from "../context/AppContext";
import timeFormat from "../lib/timeFormat";
import dateFormat from "../lib/dateFormat";
import { motion } from "framer-motion";
import { TicketIcon, CalendarIcon, ClockIcon } from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { image_base_url } = useAppContext();

  const getMyBookings = () => {
    setBookings(dummyBookingData);
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  if (!bookings) return <Loader />;

  return (
    <div className="relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh] text-white">
      <BlurCircle top="100px" left="100px" />
      <BlurCircle bottom="0px" left="600px" />
      <h1 className="text-2xl font-bold mb-8">My Bookings</h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden bg-primary-700/5 border border-primary-700/20 rounded-xl p-5 backdrop-blur-md transition-shadow hover:shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                src={assests.adventure}
                alt="movie poster"
                className="w-full md:w-52 h-32 object-cover rounded-md shadow-md"
              />

              <div className="flex-1 space-y-3">
                <h2 className="text-xl font-bold text-white">
                  {booking.show.movie.title}
                </h2>

                <div className="flex flex-wrap gap-6 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary-400" />
                    {dateFormat(booking.show.showDateTime)}
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-primary-400" />
                    {timeFormat(booking.show.movie.runtime)}
                  </div>
                  <div className="flex items-center gap-2">
                    <TicketIcon className="w-4 h-4 text-primary-400" />
                    {booking.bookedSeats.length} Tickets
                  </div>
                </div>

                <div className="text-sm">
                  <p className="text-primary-500 font-medium">
                    Seat Numbers:{" "}
                    <span className="text-white">
                      {booking.bookedSeats.join(", ")}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-xl font-bold ">
                  ${booking.amount}
                </span>
                <button className="px-4 py-2 text-sm bg-primary-700 hover:bg-primary-400 rounded-full transition shadow-md">
                  Pay Now
                </button>
              </div>
            </div>

            {/* Interactive glow effect */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-primary-700/5 rounded-xl opacity-0 group-hover:opacity-100 transition"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.15 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
