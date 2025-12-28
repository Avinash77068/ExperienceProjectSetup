
import { useIdorRoute } from "../../hooks/useIdorRoute";

const ShayariDetail = ({ title, content, image }) => {

  const { id } = useIdorRoute();
  console.log(id);
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      {/* Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2 text-purple-700">{title}</h2>

      {/* Content */}
      <p className="text-gray-800 whitespace-pre-line mb-4">{content}</p>

      {/* Actions */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2 text-red-500 cursor-pointer">
          ❤️ <span>120</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          💬 <span>15</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 hover:text-purple-700 transition cursor-pointer">
          🔗 Share
        </div>
      </div>

      {/* Comment Input */}
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition">
          Comment
        </button>
      </div>

      {/* Comment List */}
      {/* <div className="mt-4">
        <div className="border-b border-gray-200 py-2 text-gray-700">
          This is a sample comment.
        </div>
        <div className="border-b border-gray-200 py-2 text-gray-700">
          Another comment example.
        </div>
      </div> */}
    </div>
  );
};

export default ShayariDetail;
