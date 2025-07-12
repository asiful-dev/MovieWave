import React from "react";
import { dummyBookingData } from "../../assets/assests";
import Title from "../../components/admin/Title";
import dateFormat from "../../lib/dateFormat";
const ListBookings = () => {
  const bookings = dummyBookingData;
  return (
    <div>
      <Title text1="List" text2="Bookings" />
      <div className="max-w-4xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg backdrop-blur-md">
          <thead>
            <tr className="bg-primary-700/40 text-left text-white">
              <th className="p-3 font-semibold tracking-wide">User Name</th>
              <th className="p-3 font-semibold tracking-wide">Movie Name</th>
              <th className="p-3 font-semibold tracking-wide">Show Time</th>
              <th className="p-3 font-semibold tracking-wide">Seats</th>
              <th className="p-3 font-semibold tracking-wide">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {bookings.map((booking, index) => {
              return (
                <tr
                  key={index}
                  className="border-b border-gray-400 bg-primary/10 even:bg-primary/20 transition-colors duration-200 hover:bg-primary-600/30 hover:shadow-md hover:scale-[1.01] cursor-pointer"
                >
                  <td className="p-2 min-w-45 pl-5">{booking.user.name}</td>
                  <td className="p-2 ">{booking.show.movie.title}</td>
                  <td className="p-2 ">
                    {dateFormat(booking.show.showDateTime)}
                  </td>
                  <td className="p-2 ">
                    {Object.keys(booking.bookedSeats)
                      .map((seat) => booking.bookedSeats[seat])
                      .join(", ")}
                  </td>
                  <td className="p-2 text-green-400 font-semibold">
                    $ {booking.amount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBookings;
