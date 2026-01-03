// src/components/Auth/Login.tsx
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../store/thunks/authThunks";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");

  const handleLogin =  () => {
    const payload = {
      email: username,
      password,
    };
    const result = dispatch(loginUser(payload));

    if (result.success) {
      navigate("/home", { replace: true });
    } else {
      console.error('Login failed:', result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-pink-500 to-red-400">
      <div className="bg-white w-[360px] p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">
          Shayari Login ✨
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Apni shayari duniya me wapas aaye
        </p>

        <div className="mb-4 relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-4 relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          Account nahi hai?{" "}
          <span className="text-purple-600 cursor-pointer font-semibold">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
