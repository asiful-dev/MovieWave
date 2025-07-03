import React from "react";
import { useNavigate } from "react-router";
import { ScaleLoader } from "react-spinners";

const Loader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <ScaleLoader color="#f84565" />
    </div>
  );
};

export default Loader;
