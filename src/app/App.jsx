import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import Navbar from "../components/common/Navbar";
import { useEffect } from "react";


export default function App() {
  useEffect(() => {
    localStorage.setItem("token", "dummy_token");
    }, []);
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
