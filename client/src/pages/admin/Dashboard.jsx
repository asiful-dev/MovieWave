import React, { useEffect, useRef } from "react";
import { Armchair, DollarSignIcon, UserCircleIcon } from "lucide-react";

import KeyMetricsCards from "../../components/KeyMetricsCards";
import { dummyDashboardData } from "../../assets/assests";
import RevenueChart from "../../components/Charts/RevenueChart";
import SeatPieChart from "../../components/Charts/SeatPieChart";
import { useAppContext } from "../../context/AppContext";
import MovieCard from "../../components/MovieCard";

const Dashboard = () => {
  const { nowPlayingMovies } = useAppContext();
  return (
    <>
      {/* key metrics card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KeyMetricsCards
          title={"Total Bookings"}
          data={dummyDashboardData.totalBookings.toLocaleString()}
          IconName={Armchair}
          dollarIcon={false}
        />
        <KeyMetricsCards
          title={"Total Revenue"}
          data={dummyDashboardData.totalRevenue.toLocaleString()}
          IconName={DollarSignIcon}
          dollarIcon={true}
        />
        <KeyMetricsCards
          title={"Total Users"}
          data={dummyDashboardData.totalUser.toLocaleString()}
          IconName={UserCircleIcon}
          dollarIcon={false}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nowPlayingMovies.slice(0, 3).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
