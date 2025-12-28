// src/layouts/DashboardLayout.tsx
import CardGrid from "../ui/CardGrid";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import useSidebar from "../../hooks/useSidebar";
import { Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const { isOpen, toggle } = useSidebar();
  const location = useLocation();
  const showOutletInstead = location.pathname !== "/home";

  return (
    <div className="flex h-screen w-full">
      {isOpen && <Sidebar isOpen={isOpen} toggle={toggle} />}
      <div className={`flex flex-col ${isOpen ? "flex-1" : "w-full"} transition-all duration-300`}>
        <Navbar isOpen={isOpen} toggle={toggle} />
        <main className="flex-1 w-full p-4 overflow-auto">
          {showOutletInstead ? <Outlet /> : <CardGrid />}
        </main>
      </div>
    </div>
  );
}
