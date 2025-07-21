import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";
import BlurCircle from "../../components/BlurCricle";
import { useAppContext } from "../../context/AppContext";

const AdminLayout = () => {
  const { isAdmin } = useAppContext();


  return isAdmin ? (
    <>
      <AdminNavbar />
      <div className="flex relative">
        <AdminSidebar />
        <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default AdminLayout;
