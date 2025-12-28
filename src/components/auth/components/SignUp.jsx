
// src/components/Auth/Signup.tsx
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="bg-white w-[380px] p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          Create Account 🌸
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Apni khud ki shayari likho aur share karo
        </p>

        <div className="mb-4 relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="mb-4 relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="mb-4 relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition">
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Pehle se account hai?{" "}
          <span className="text-indigo-600 cursor-pointer font-semibold">
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default SignUp;
