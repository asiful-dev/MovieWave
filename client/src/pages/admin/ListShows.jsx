import React, { useEffect } from "react";
import { dummyDashboardData } from "../../assets/assests";
import Title from "../../components/admin/Title";
import dateFormat from "../../lib/dateFormat";
import BlurCircle from "../../components/BlurCricle";
import { useAppContext } from "../../context/AppContext";
const ListShows = () => {
  const activeShows = dummyDashboardData.activeShows;
  const { showDetails } = useAppContext();

  console.log("From List Show Component\n", showDetails);

  return (
    <div className="w-full min-h-screen">
      <Title text1="List" text2="Shows" />
      <div className="max-w-4xl mt-6 overflow-x-auto relative">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg backdrop-blur-md">
          <thead>
            <tr className="bg-primary-700/40 text-left text-white">
              <th className="p-3 font-semibold tracking-wide">Movie Name</th>
              <th className="p-3 font-semibold tracking-wide">Show Time</th>
              <th className="p-3 font-semibold tracking-wide">
                Total Bookings
              </th>
              <th className="p-3 font-semibold tracking-wide">Earnings</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light">
            {showDetails.map((show, index) => (
              <tr
                key={index}
                className="border-b border-gray-400 bg-primary/10 even:bg-primary/20 transition-colors duration-200 hover:bg-primary-600/30 hover:shadow-md hover:scale-[1.01] cursor-pointer"
              >
                <td className="p-3 min-w-45 pl-5 text-white">{show.movie.title}</td>
                <td className="p-3 text-primary-200">
                  {dateFormat(show.showDateTime)}
                </td>
                <td className="p-3 text-primary-100">
                  {Object.keys(show.occupiedSeats).length}
                </td>
                <td className="p-3 text-green-400 font-medium">
                  $ {Object.keys(show.occupiedSeats).length * show.showPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListShows;
