import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import kConverter from "../../lib/kConverter";
import { CheckIcon, DeleteIcon, StarIcon } from "lucide-react";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import Title from "../../components/admin/Title";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

const AddShows = () => {
  const { image_base_url, nowPlayingMovies, axios, getToken, user } =
    useAppContext();

  const [showPrice, setShowPrice] = useState("");
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [isAddingShow, setIsAddingShow] = useState(false);

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return null;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return null;
    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
  };
  function handleRemovTime(date, time) {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (!filteredTimes.length) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  }
  // console.log(dateTimeSelection);

  // Helper functions to format date and time
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function formatTime(timeStr) {
    // timeStr is "HH:MM"
    const [hour, minute] = timeStr.split(":");
    const date = new Date();
    date.setHours(Number(hour), Number(minute));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  // State to track selected movie
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleSubmit = async () => {
    try {
      setIsAddingShow(true);
      if (
        !showPrice ||
        Object.keys(dateTimeSelection).length === 0 ||
        !selectedMovieId
      ) {
        setIsAddingShow(false);
        return toast.error(
          "Please select a movie, enter show price and select at least one date-time."
        );
      }

      // Convert dateTimeSelection object to array of { date, time } objects
      const showsInput = Object.entries(dateTimeSelection).map(
        ([date, times]) => ({ date, time: times })
      );
      console.log("Converted showsInput:", showsInput);

      const payload = {
        movieId: selectedMovieId,
        showsInput,
        showPrice: Number(showPrice),
      };

      const { data } = await axios.post("/show/add", payload, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        toast.success(data.message);
        setSelectedMovieId(null);
        setDateTimeSelection({});
        setShowPrice("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Submission error ", error);
      toast.error("An error occurred. Please try again");
    } finally {
      setIsAddingShow(false);
    }
  };

  return (
    <div className="w-full">
      <Title text1="Add" text2={"Shows"} />
      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>
      <div className="overflow-x-auto pb-4">
        <div className="group flex flex-wrap gap-6 mt-4 w-max">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              className={`relative max-w-46 p-3 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300 ${
                selectedMovieId === movie.id
                  ? "ring-2 ring-primary-700 rounded-lg"
                  : ""
              }`}
              onClick={() =>
                setSelectedMovieId(
                  selectedMovieId === movie.id ? null : movie.id
                )
              }
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={image_base_url + movie.poster_path}
                  className="w-full object-cover brightness-90"
                />
                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                  <p className="flex items-center gap-1 text-gray-400">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-primary" />
                    {movie.vote_average.toFixed(1)}
                  </p>
                  <p className="text-gray-300">
                    {kConverter(movie.vote_count)} Votes
                  </p>
                </div>
              </div>
              <div className="absolute top-2 right-2 flex items-center justify-center  h-6 w-6 rounded">
                {selectedMovieId === movie.id ? (
                  <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                ) : (
                  <div className="w-4 h-4 border-2 border-white rounded"></div>
                )}
              </div>
              <p className="font-medium truncate">{movie.title}</p>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* show price input */}
      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Set Show Price</label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <p className="text-gray-400 text-sm">$</p>

          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Show Price"
            className="outline-none"
          />
        </div>
      </div>

      {/* date and time selection */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Select Date and Time
        </label>
        <div className="inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="outline-none rounded-md"
          />
          <Button
            onClick={handleDateTimeAdd}
            className="bg-primary-700/80 px-3 py-2 text-sm rounded-lg hover:bg-primary-700 cursor-pointer"
          >
            Add Time
          </Button>
        </div>
      </div>

      {/* display selected times */}
      <div className="mt-8">
        <h2>Selected Date-Time</h2>
        <div className="flex flex-col gap-3 mt-2">
          {Object.entries(dateTimeSelection).length === 0 && (
            <p className="text-gray-400 text-sm">No date-time selected.</p>
          )}
          {Object.entries(dateTimeSelection).map(([date, times]) => (
            <div key={date}>
              <p className="font-medium">{formatDate(date)}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {times.map((time) => (
                  <div
                    key={time}
                    className="flex items-center gap-1 bg-gray-800 p-3 rounded text-sm"
                  >
                    <span>{formatTime(time)}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovTime(date, time)}
                      className="ml-1 text-red-400 hover:text-red-600"
                      title="Remove"
                    >
                      <DeleteIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button
            onClick={handleSubmit}
            className="bg-primary-700 px-6 py-2 rounded-lg text-white font-semibold hover:bg-primary-800 transition"
            disabled={isAddingShow}
          >
            {isAddingShow ? (
              <ClipLoader color="#fff" size={20} /> // Display loader when adding
            ) : (
              "Add Show" // Display text when not adding
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddShows;
