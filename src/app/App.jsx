import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import Navbar from "../components/common/Navbar";
import { useEffect } from "react";

export default function App() {
  const random = Math.random(1);
  
  useEffect(() => {
    if (random > 0.5) {
      localStorage.setItem("token", "dummy_token");
    }
    if (random < 0.5) {
      localStorage.removeItem("token");
    }
  }, []);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
