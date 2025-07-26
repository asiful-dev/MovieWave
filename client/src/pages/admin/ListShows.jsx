import React, { useEffect, useState } from "react";
import Title from "../../components/admin/Title";
import dateFormat from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { TrashIcon } from "lucide-react";

const ListShows = () => {
  const { showDetails, getToken } = useAppContext();
  const [shows, setShows] = useState([]);

  useEffect(() => {
    setShows(showDetails);
  }, [showDetails]);
  
  const handleDelete = async (showId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this show?");
    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete("/show/delete", {
        data: { showId },
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      toast.success(data.message || "Show deleted");
      setShows((prev) => prev.filter((s) => s._id !== showId));
    } catch (error) {
      toast.error("Failed to delete show");
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen px-4">
      <Title text1="List" text2="Shows" />
      <div className="mt-6 max-w-5xl overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-collapse rounded-lg overflow-hidden shadow-lg backdrop-blur-md">
          <thead>
            <tr className="bg-primary-700/40 text-white text-sm sm:text-base">
              <th className="p-3 font-semibold">Movie Name</th>
              <th className="p-3 font-semibold">Show Time</th>
              <th className="p-3 font-semibold">Total Bookings</th>
              <th className="p-3 font-semibold">Earnings</th>
              <th className="p-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-white">
            {shows.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-5 text-center text-primary-200">
                  No Shows Available
                </td>
              </tr>
            ) : (
              shows.map((show, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-600 even:bg-primary-900/20 transition-all hover:bg-primary-700/20 hover:scale-[1.01]"
                >
                  <td className="p-3 pl-5 min-w-[150px]">{show.movie.title}</td>
                  <td className="p-3 text-primary-200 min-w-[130px]">
                    {dateFormat(show.showDateTime)}
                  </td>
                  <td className="p-3 text-primary-100">
                    {Object.keys(show.occupiedSeats).length}
                  </td>
                  <td className="p-3 text-green-400 font-medium">
                    $ {Object.keys(show.occupiedSeats).length * show.showPrice}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(show._id)}
                      className="text-red-400 hover:text-red-600 transition-all"
                      title="Delete Show"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
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

export default ListShows;
