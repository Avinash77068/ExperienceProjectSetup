import ShayariCard from "../common/ShayariCard";
import { sampleShayaris } from "../../constant/data/shayri/shayridata";
import { useNavigate } from "react-router-dom";
import useSidebar from "../../hooks/useSidebar";

const Explore = () => {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Shayaris</h1>
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search shayaris..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
};

export default Explore;
