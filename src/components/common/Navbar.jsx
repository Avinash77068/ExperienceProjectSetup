
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import useSidebar from "../../hooks/useSidebar";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ isOpen, toggle }) => {

   const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-linear-to-r from-purple-700 via-pink-600 to-red-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-end">
        {/* Logo */}
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          <li className="hover:text-yellow-300 cursor-pointer">Home</li>
          <li className="hover:text-yellow-300 cursor-pointer">Explore</li>
          <li className="hover:text-yellow-300 cursor-pointer">Categories</li>
          <li className="hover:text-yellow-300 cursor-pointer">
            Write Shayari
          </li>

          {!isAuthenticated ? (
            <>
              <li className="border px-4 py-1 rounded-full hover:bg-white hover:text-purple-700 transition cursor-pointer">
                Login
              </li>
              <li className="bg-white text-purple-700 px-4 py-1 rounded-full hover:bg-yellow-300 transition cursor-pointer">
                Sign Up
              </li>
            </>
          ) : (
            <li className="flex items-center gap-2 cursor-pointer">
              <FaUserCircle size={22} />
              Profile
            </li>
          )}
        </ul>
        {/* Mobile Menu Button */}
        <div className="md:hidden" onClick={toggle}>
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} /> }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
