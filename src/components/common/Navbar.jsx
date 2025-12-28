import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ isOpen, toggle }) => {
  const { isAuthenticated, logout } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);

  // demo username (future me backend se aayega)
  const userName = localStorage.getItem("userName") || "Avinash";

  return (
    <nav className="bg-linear-to-r from-purple-700 via-pink-600 to-red-500 text-white shadow-lg">
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer select-none">
          ✍️ Shayari
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-medium relative">
          <li className="hover:text-yellow-300">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-yellow-300">
            <Link to="/home/explore">Explore</Link>
          </li>
          <li className="hover:text-yellow-300">
            <Link to="/home/categories">Categories</Link>
          </li>
          <li className="hover:text-yellow-300">
            <Link to="/home/write">Write Shayari</Link>
          </li>

          {!isAuthenticated() ? (
            <>
              <li className="border border-white px-4 py-1 rounded-full hover:bg-white hover:text-purple-700 transition cursor-pointer">
                Login
              </li>
              <li className="bg-white text-purple-700 px-4 py-1 rounded-full hover:bg-yellow-300 transition cursor-pointer">
                Sign Up
              </li>
            </>
          ) : (
            /* Profile Dropdown */
            <li className="relative">
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="flex items-center gap-2 hover:text-yellow-300 transition"
              >
                <FaUserCircle size={22} />
                <span>{userName}</span>
              </button>

              {openProfile && (
                <div className="absolute cursor-pointer right-0 mt-3 w-44 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b font-semibold text-purple-700">
                    {userName}
                  </div>

                  <Link
                    to="/home/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggle}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
