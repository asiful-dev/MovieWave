import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BlurCircle from "./BlurCricle";
import Button from "./Button";
import { useAppContext } from "../context/AppContext";
const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { user } = useAppContext();

  const onBookHandler = () => {
    return toast.error("Please select a date to proceed");
    if (!user) return toast.error("Please Login To Proceed");
    navigate(`/movies/${id}/${selected}`);
    scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative mt-20 bg-primary-950/60 border border-primary-700 p-6 rounded-xl overflow-hidden">
      {/* Blur Decorations */}
      <BlurCircle top="-60px" left="-60px" />
      <BlurCircle bottom="-40px" right="0px" />

      <div className="flex flex-col justify-between items-center lg:flex-row  gap-10">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-primary-300 mb-4">
            Choose Date
          </h2>
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar text-sm">
            <ChevronLeftIcon className="min-w-[24px]" />
            <div className="flex gap-4">
              {Object.keys(dateTime).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelected(date)}
                  className={`h-16 w-16 flex flex-col justify-center items-center rounded-lg transition-all duration-200 ${
                    selected === date
                      ? "bg-primary-600 text-white shadow-lg"
                      : "bg-primary-100/10 text-primary-200 border border-primary-600"
                  }`}
                >
                  <span className="text-lg font-semibold">
                    {new Date(date).getDate()}
                  </span>
                  <span className="text-xs uppercase">
                    {new Date(date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </button>
              ))}
            </div>
            <ChevronRightIcon className="min-w-[2rem]" />
          </div>
        </div>

        <Button
          onClick={onBookHandler}
          className="mt-6 lg:mt-0 bg-primary-600 hover:bg-primary-500 transition px-8 py-2 rounded-full font-semibold text-white shadow-md"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default DateSelect;
