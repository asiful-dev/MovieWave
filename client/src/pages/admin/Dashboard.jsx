import React, { useEffect, useRef, useState } from "react";
import { Armchair, DollarSignIcon, UserCircleIcon } from "lucide-react";
import { dummyDashboardData } from "../../assets/assests";
import { useAppContext } from "../../context/AppContext";
import MovieCard from "../../components/MovieCard";
import KeyMetricsCards from "../../components/KeyMetricsCards";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const { nowPlayingMovies, getToken, axios } = useAppContext();
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchDashBoardData = async () => {
    try {
      const { data } = await axios.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      console.log("From Dashboard ", data.data);

      if (data.success) setDashboardData(data.data);
      else toast.error(data.message);
    } catch (error) {
      toast.error("Failed Fetch Dashboard Data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashBoardData();
  }, []);
  return !loading ? (
    <>
      {/* key metrics card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <KeyMetricsCards
          title={"Total Bookings"}
          data={dashboardData.totalBookings.toLocaleString() || ""}
          IconName={Armchair}
          dollarIcon={false}
        />
        <KeyMetricsCards
          title={"Total Revenue"}
          data={dashboardData.totalRevenue.toLocaleString() || ""}
          IconName={DollarSignIcon}
          dollarIcon={true}
        />
        <KeyMetricsCards
          title={"Total Users"}
          data={dashboardData.totalUser.toLocaleString() || ""}
          IconName={UserCircleIcon}
          dollarIcon={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {nowPlayingMovies.slice(0, 3).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  ) : (
    <div>
      <Loader />
    </div>
  );
};

export default Dashboard;
