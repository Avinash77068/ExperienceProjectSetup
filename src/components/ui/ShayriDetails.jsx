import { useIdorRoute } from "../../hooks/useIdorRoute";
import { sampleShayaris } from "../../constant/data/shayri/shayridata";
import { FaHeart, FaCommentAlt, FaShareAlt } from "react-icons/fa";

const ShayariDetail = () => {
  const { id } = useIdorRoute();
  const shayari = sampleShayaris.find((s) => s.id == id);
  if (!shayari) return null;
  return (
    <div className="flex flex-col p-4 sm:flex-row gap-4 mx-auto">
      {/* Card */}
      <div
        className="relative rounded-2xl shadow-xl overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${shayari.image})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative p-6 md:p-8 text-white">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {shayari.title}
          </h1>

          {/* Shayari */}
          <p className="text-lg leading-relaxed whitespace-pre-line mb-6 text-white/90">
            {shayari.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-8 border-y border-white/20 py-4 mb-6">
            <button className="flex items-center gap-2 hover:text-red-400 transition">
              <FaHeart />
              <span>{shayari.likes}</span>
            </button>

            <div className="flex items-center gap-2">
              <FaCommentAlt />
              <span>{shayari.comments.length}</span>
            </div>

            <button className="flex items-center gap-2 hover:text-purple-300 transition">
              <FaShareAlt />
              <span>Share</span>
            </button>
          </div>

          {/* Comment Box */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-full rounded-xl px-4 py-3 text-gray-800 border border-white bg-white focus:outline-none focus:ring-2 focus:ring-purple-500focus:border-white"            />
            <button className="mt-3 cursor-pointer bg-purple-600 hover:bg-purple-700  px-6 py-2 rounded-xl transition">
              Post Comment
            </button>
          </div>

          {/* Comments */}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg text-black font-semibold mb-4">Comments</h3>

        <div className="space-y-4">
          {shayari.comments.map((comment, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur rounded-xl p-4"
            >
              <p className="font-semibold text-black">{comment.user}</p>
              <p className="text-black mt-1">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShayariDetail;
