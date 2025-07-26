import React, { useEffect, useState } from "react";
import Title from "../../components/admin/Title";
import dateFormat from "../../lib/dateFormat";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ListBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAppContext();
  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/admin/all-bookings", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      setBookings(data.data || []);
    } catch (error) {
      toast.error("Failed to load bookings.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="w-full min-h-screen px-4">
      <Title text1="List" text2="Bookings" />
      <div className="mt-6 max-w-5xl overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse rounded-lg overflow-hidden shadow-lg backdrop-blur-md">
          <thead>
            <tr className="bg-primary-700/40 text-left text-white text-sm sm:text-base">
              <th className="p-3 font-semibold">User Name</th>
              <th className="p-3 font-semibold">Movie Name</th>
              <th className="p-3 font-semibold">Show Time</th>
              <th className="p-3 font-semibold">Seats</th>
              <th className="p-3 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-white">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-5 text-center text-primary-300">
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-5 text-center text-primary-200">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-400 bg-primary/10 even:bg-primary/20 transition-all duration-200 hover:bg-primary-600/30 hover:shadow-md hover:scale-[1.01]"
                >
                  <td className="p-3 min-w-[120px]">{booking.user.name}</td>
                  <td className="p-3 min-w-[130px]">
                    {booking.show.movie.title}
                  </td>
                  <td className="p-3 min-w-[150px]">
                    {dateFormat(booking.show.showDateTime)}
                  </td>
                  <td className="p-3 min-w-[100px]">
                    {Object.values(booking.bookedSeats).join(", ")}
                  </td>
                  <td className="p-3 text-green-400 font-semibold min-w-[80px]">
                    $ {booking.amount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBookings;
