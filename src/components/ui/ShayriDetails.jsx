import { useIdorRoute } from "../../hooks/useIdorRoute";
import { sampleShayaris } from "../../constant/data/shayri/shayridata";
import {
  FaHeart,
  FaCommentAlt,
  FaShareAlt,
  FaBookmark,
  FaCopy,
} from "react-icons/fa";
import { motion } from "framer-motion"; // Assuming framer-motion is installed for animations

const ShayariDetail = () => {
  const { id } = useIdorRoute();
  const shayari = sampleShayaris.find((s) => s.id == id);
  if (!shayari) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shayari.content);
    // You can add a toast notification here if needed
  };

  return (
    <div className="min-h-screen gap-4 bg-linear-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-4xl w-full bg-white/5 h-auto backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
      >
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${shayari.image})` }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-black/30"></div>

        {/* Main Content */}
        <div className="relative z-10 p-8 md:p-12 text-white">
          {/* Title with Glow */}
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center drop-shadow-lg">
            {shayari.title}
          </h1>

          {/* Shayari Content in a Scrollable Parchment Style */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-inner max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
            <p className="text-lg md:text-xl leading-loose text-center font-serif italic text-white/95">
              {shayari.content.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>

          {/* Actions Bar with Hover Effects */}
          <div className="flex justify-center items-center gap-6 md:gap-10 mb-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-1 text-red-300 hover:text-red-500 transition"
            >
              <FaHeart className="text-2xl" />
              <span className="text-sm">{shayari.likes}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-1 text-indigo-300 hover:text-indigo-500 transition"
            >
              <FaCommentAlt className="text-2xl" />
              <span className="text-sm">{shayari.comments.length}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-1 text-purple-300 hover:text-purple-500 transition"
            >
              <FaShareAlt className="text-2xl" />
              <span className="text-sm">Share</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-1 text-yellow-300 hover:text-yellow-500 transition"
            >
              <FaBookmark className="text-2xl" />
              <span className="text-sm">Save</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={copyToClipboard}
              className="flex flex-col items-center gap-1 text-green-300 hover:text-green-500 transition"
            >
              <FaCopy className="text-2xl" />
              <span className="text-sm">Copy</span>
            </motion.button>
          </div>

          {/* Add Comment Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Share Your Thoughts
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 rounded-full px-6 py-3 text-gray-900 bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition">
                Post
              </button>
            </div>
          </div>

          {/* Comments Section with Accordion Style */}
        </div>
      </motion.div>
      <motion.div className="bg-white/10 w-full h-auto backdrop-blur-md rounded-2xl p-6 shadow-inner">
        <h3 className="text-xl font-semibold mb-4">
          Comments ({shayari.comments.length})
        </h3>
        <div className="space-y-4 max-h-[95vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
          {shayari.comments.map((comment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-xl p-4"
            >
              <p className="font-semibold text-purple-200">{comment.user}</p>
              <p className="text-sm text-white/80 mt-1">{comment.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ShayariDetail;
