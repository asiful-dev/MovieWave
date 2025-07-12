import React from "react";
import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from "lucide-react";
import { assests } from "../../assets/assests";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const AdminSidebar = () => {
  const adminNavLinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Add Shows", path: "/admin/add-shows", icon: PlusSquareIcon },
    { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
    {
      name: "List Bookings",
      path: "/admin/list-bookings",
      icon: ListCollapseIcon,
    },
  ];

  return (
    <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-10 max-w-14 md:max-w-60 w-full border border-white/10 bg-primary-700/5 text-sm rounded-xl m-4 shadow-md backdrop-blur-lg">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <img
          src={assests.profile}
          alt="admin profile"
          className="h-10 md:h-16 w-10 md:w-16 rounded-full mx-auto border-2 border-primary-400 shadow p-2"
        />
        <p className="mt-3 text-sm font-medium text-primary-300 max-md:hidden text-center">
          Admin
        </p>
      </motion.div>

      <div className="w-full mt-8 space-y-2">
        {adminNavLinks.map((link, index) => (
          <NavLink
            key={link.name}
            to={link.path}
            end
            className={({ isActive }) =>
              `group relative flex items-center gap-3 w-full px-5 py-3 transition-all duration-200 rounded-lg ${
                isActive
                  ? "bg-primary-700/20 text-white"
                  : "text-gray-400 hover:bg-white/5"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon
                  className={`w-5 h-5 transition ${
                    isActive ? "text-primary-400" : ""
                  }`}
                />
                <p className="hidden md:block font-medium">{link.name}</p>
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-primary-400"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
