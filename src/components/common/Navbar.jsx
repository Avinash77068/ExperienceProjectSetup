import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Navbar = ({ isOpen, toggle }) => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-linear-to-r from-purple-700 via-pink-600 to-red-500 text-white shadow-lg">
      <div className=" mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer select-none"
          onClick={!isOpen ? toggle : undefined}
        >
          ✍️ Shayari
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          <li className="hover:text-yellow-300 cursor-pointer"><Link to="/">Home</Link></li>
          <li className="hover:text-yellow-300 cursor-pointer"><Link to="/home/explore">Explore</Link></li>
          <li className="hover:text-yellow-300 cursor-pointer"><Link to="/home/categories">Categories</Link></li>
          <li className="hover:text-yellow-300 cursor-pointer"><Link to="/home/write">Write Shayari</Link></li>

          {!isAuthenticated ? (
            <>
              <li className="border border-white px-4 py-1 rounded-full hover:bg-white hover:text-purple-700 transition cursor-pointer">
                Login
              </li>
              <li className="bg-white text-purple-700 px-4 py-1 rounded-full hover:bg-yellow-300 transition cursor-pointer">
                Sign Up
              </li>
            </>
          ) : (
            <li className="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition">
              <FaUserCircle size={22} />
              <span>Profile</span>
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
