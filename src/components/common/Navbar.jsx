import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { logoutUser } from "../../store/thunks/authThunks";
import { Button } from "../customComponents/Button";
import { NavItem } from "../customComponents/NavItem";

const Navbar = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);

  const isLoggedIn = useMemo(() => isAuthenticated(), [isAuthenticated]);
  const userEmail = user?.email ?? "User";

  const handleLogout = useCallback(() => {
    dispatch(logoutUser());
    navigate("/", { replace: true });
  }, [dispatch, navigate]);

  /* Close profile dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-linear-to-r from-purple-700 via-pink-600 to-red-500 text-white shadow-lg sticky top-0 z-50">
      <div
        className={`mx-auto px-4 py-4 flex items-center ${
          isOpen ? "justify-end" : "justify-between"
        }`}
      >
        {/* Logo */}
        {!isOpen && (
          <div
            onClick={toggle}
            className="text-2xl font-bold select-none tracking-wide"
          >
            ✍️ Shayari
          </div>
        )}

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          <NavItem to="/" label="Home" />
          <NavItem to="/home/explore" label="Explore" />
          <NavItem to="/home/categories" label="Categories" />
          <NavItem to="/home/write" label="Write Shayari" />

          {!isLoggedIn ? (
            <>
              <Button to="/login" variant="outline">
                Login
              </Button>
              <Button to="/signup" variant="filled">
                Sign Up
              </Button>
            </>
          ) : (
            /* Profile */
            <li className="relative" ref={profileRef}>
              <button
                onClick={() => setOpenProfile((prev) => !prev)}
                className="flex items-center gap-2 max-w-[180px] truncate hover:text-yellow-300 transition"
                aria-haspopup="true"
                aria-expanded={openProfile}
              >
                <FaUserCircle size={22} />
                <span className="truncate">{userEmail}</span>
              </button>

              {openProfile && (
                <div className="absolute right-0 mt-3 w-48 bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden">
                  <div className="px-4 py-3 border-b text-sm font-semibold text-purple-700 truncate">
                    {userEmail}
                  </div>

                  <Link
                    to="/home/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Mobile Toggle */}
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
