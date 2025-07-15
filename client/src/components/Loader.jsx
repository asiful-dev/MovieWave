import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const Loader = () => {
  const { nextUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 8000);
    }
  }, []);
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <ScaleLoader color="#167bdf" />
    </div>
  );
};

export default Loader;
