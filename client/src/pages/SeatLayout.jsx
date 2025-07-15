import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../lib/isoTimeFormat";
import BlurCircle from "../components/BlurCricle";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import ClipLoader from "react-spinners/ClipLoader";

const SeatLayout = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];

  const { axios, getToken, user } = useAppContext();
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getShow = async () => {
    try {
      const { data } = await axios.get(`/show/${id}`);
      if (data.success) setShow(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  function handleSeatClick(seatId) {
    if (!selectedTime) return toast.error("Please Select Time First");
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4)
      return toast("You can only select 5 seats");
    if (occupiedSeats.includes(seatId))
      return toast("This seat is already booked");

    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((seat) => seat !== seatId) : [...prev, seatId]
    );
  }

  function renderSeats(row, count = 9) {
    return (
      <div key={row} className="flex gap-2 mt-2">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: count }, (_, i) => {
            const seatId = `${row}${i + 1}`;
            return (
              <Button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                className={`h-10 w-10 rounded border transition-all duration-200 \
                  ${selectedSeats.includes(seatId)
                    ? "bg-primary-700 text-white"
                    : "bg-transparent text-white hover:bg-primary-500 border-primary-700/30"} \
                  ${occupiedSeats.includes(seatId) ? "opacity-50" : ""}`}
              >
                {seatId}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }

  const getOccupiedSeats = async () => {
    try {
      const { data } = await axios.get(`/booking/seats/${selectedTime?.showId}`);
      if (data.success) {
        setOccupiedSeats(data.data);
      } else toast.error(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const bookTickets = async () => {
    try {
      if (!user) return toast.error("Please Login to proceed!");
      if (!selectedTime || !selectedSeats.length)
        return toast.error("Please select a time and seats");

      setLoading(true);
      const { data } = await axios.post(
        "/booking/create",
        { showId: selectedTime.showId, selectedSeats },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        window.location.href = data.data.url;
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  useEffect(() => {
    if (selectedTime) getOccupiedSeats();
  }, [selectedTime]);

  return show ? (
    <div className="flex flex-col md:flex-row justify-between px-6 md:px-16 lg:px-20 py-40 md:pt-50">
      {/* Sidebar: Available Timings */}
      <div className="w-60 bg-primary-700/10 border border-primary-700/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {show[1][date].map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 w-max rounded-r-md cursor-pointer transition ${
                selectedTime?.time === item.time
                  ? "bg-primary-700 text-white"
                  : "hover:bg-primary-700/20"
              }`}
            >
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats Layout & Checkout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0px" right="0px" />
        <h1 className="text-2xl font-semibold mb-4">Select Your Seat</h1>
        {/* Screen Graphic */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 585 29"
          fill="none"
          className="w-full h-auto max-w-[600px] animate-pulse"
        >
          <path
            d="M585 29V17C585 17 406.824 0 292.5 0C178.176 0 0 17 0 17V29C0 29 175.5 12 292.5 12C404.724 12 585 29 585 29Z"
            fill="#5accff"
            fillOpacity="0.3"
          />
        </svg>
        <p className="text-gray-400 text-lg mb-6">Screen Side</p>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
          {groupRows[0].map((row) => renderSeats(row))}
        </div>
        <div className="grid grid-cols-2 gap-11">
          {groupRows.slice(1).map((group, idx) => (
            <div key={idx}>{group.map((row) => renderSeats(row))}</div>
          ))}
        </div>

        <Button
          onClick={bookTickets}
          disabled={loading}
          className="flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary-700 hover:bg-primary-600 transition rounded-full font-medium cursor-pointer active:scale-95 disabled:opacity-50"
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : <><span>Proceed to Checkout</span><ArrowRightIcon strokeWidth={3} className="w-4 h-4" /></>}
        </Button>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default SeatLayout;
