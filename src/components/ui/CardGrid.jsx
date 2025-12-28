import ShayariCard from "../common/ShayariCard";
import { sampleShayaris } from "../../constant/data/shayri/shayridata";
import { useNavigate } from "react-router-dom";

const CardGrid = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {sampleShayaris.map((shayari, index) => (
        <ShayariCard
          key={index}
          title={shayari.title}
          footer={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-red-500">
                  ❤️ {shayari.likes}
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  💬 {shayari.comments.length}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {shayari.likedBy.slice(0, 2).join(", ")}
                {shayari.likedBy.length > 2 &&
                  ` +${shayari.likedBy.length - 2}`}
              </span>
            </div>
          }
          onClick={() => navigate(`/home/shayari/${index}`)}
        >
          {/* Image */}
          <div className="relative mb-3">
            <img
              src={shayari.image}
              alt={shayari.title}
              className="w-full h-44 object-cover rounded-xl"
            />
            <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {shayari.subtitle}
            </span>
          </div>

          {/* Content */}
          <p className="text-base leading-relaxed text-gray-700">
            {shayari.content.slice(0, 90)}...
            <span className="text-blue-500 hover:underline ml-1">
              Read More
            </span>
          </p>
        </ShayariCard>
      ))}
    </div>
  );
};

export default CardGrid;
