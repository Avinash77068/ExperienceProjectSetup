import { useState } from "react";
import {
  FaHome,
  FaPenNib,
  FaHeart,
  FaUser,
  FaList,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Sidebar = ({ isOpen }) => {
  const {isAuthenticated} = useAuth();

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full bg-gradient-to-b from-purple-700 via-pink-600 to-red-500 text-white w-64 p-5 transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="text-2xl font-bold mb-8 cursor-pointer">✍️ Shayari</div>

        {/* Menu */}
        <ul className="space-y-4 text-sm font-medium">
          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-white hover:text-purple-700 cursor-pointer transition">
            <FaHome /> Home
          </li>

          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-white hover:text-purple-700 cursor-pointer transition">
            <FaList /> Categories
          </li>

          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-white hover:text-purple-700 cursor-pointer transition">
            <FaHeart /> Popular Shayari
          </li>

          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-white hover:text-purple-700 cursor-pointer transition">
            <FaPenNib /> Write Shayari
          </li>

          <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-white hover:text-purple-700 cursor-pointer transition">
            <FaUser /> My Profile
          </li>

          {isAuthenticated && (
            <>
              <hr className="border-white/30 my-3" />
              <p className="text-xs uppercase tracking-wide text-white/70">
                Admin Panel
              </p>

              <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-yellow-300 hover:text-black cursor-pointer transition">
                Manage Shayari
              </li>

              <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-yellow-300 hover:text-black cursor-pointer transition">
                Users
              </li>
            </>
          )}
        </ul>

        {/* Footer */}
        <div className="absolute bottom-5 left-5 text-xs text-white/70">
          © 2025 Shayari App
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
