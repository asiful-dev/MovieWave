import React, { useEffect, useState } from "react";
import { assests, dummyBookingData } from "../assets/assests";
import Loader from "../components/Loader";
import BlurCircle from "../components/BlurCricle";
import { useAppContext } from "../context/AppContext";
import timeFormat from "../lib/timeFormat";
import dateFormat from "../lib/dateFormat";
import { motion } from "framer-motion";
import { TicketIcon, CalendarIcon, ClockIcon } from "lucide-react";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios, getToken, user, image_base_url } = useAppContext();

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get("/user/bookings", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) setBookings(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getMyBookings();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="relative px-4 md:px-16 lg:px-40 py-24 md:py-40 min-h-[80vh] text-white">
      <div className="hidden lg:block">
        <BlurCircle top="100px" left="100px" />
        <BlurCircle bottom="0px" left="600px" />
      </div>
      <h1 className="text-2xl font-bold mb-8">My Bookings</h1>

      <div className="space-y-10">
        {bookings.length === 0 ? (
          <div>
            <h1>You have no bookings!</h1>
          </div>
        ) : (
          bookings.map((booking) => (
            <motion.div
              key={booking._id}
              className="relative overflow-hidden bg-primary-700/5 border border-primary-700/20 rounded-xl p-3 sm:p-5 backdrop-blur-md transition-shadow hover:shadow-xl"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-40 aspect-[2/3] rounded-md overflow-hidden shadow-md">
                  <img
                    src={`${image_base_url}${booking?.show?.movie?.poster_path}`}
                    alt="movie poster"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between gap-4 min-w-0">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {booking.show.movie.title}
                    </h2>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-primary-400 text-xl font-semibold" />
                        {dateFormat(booking.show.showDateTime)}
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-primary-400 text-xl font-semibold" />
                        {timeFormat(booking.show.movie.runtime)}
                      </div>
                      <div className="flex items-center gap-2">
                        <TicketIcon className="w-4 h-4 text-primary-400 text-xl font-semibold" />
                        {booking.bookedSeats.length} Tickets
                      </div>
                    </div>

                    <div className="text-sm mt-2">
                      <p className="text-primary-500 font-medium">
                        Seat Numbers:{" "}
                        <span className="text-white">
                          {booking.bookedSeats.join(", ")}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span className="text-xl font-bold">${booking.amount}</span>
                    {!booking.isPaid && (
                      <Link
                        to={booking?.paymentLink}
                        className="px-4 py-2 text-sm bg-primary-700 hover:bg-primary-500 rounded-full transition shadow-md cursor-pointer"
                      >
                        Pay Now
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
