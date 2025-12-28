// src/layouts/DashboardLayout.tsx
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";
import useSidebar from "../../hooks/useSidebar";
import useIsMobile from "../../hooks/useIsMobile";
import CardGrid from "../ui/CardGrid";

export default function DashboardLayout() {
  const { isOpen, toggle } = useSidebar();
  const isMobile = useIsMobile();
  const location = useLocation();

  // Check if we're on a specific route that should show Outlet instead of cards
  const showOutletInstead = location.pathname.includes("write"); // Check relative path for nested routes

  return (
    <div className="flex h-screen">
      {!isMobile && isOpen ? (
        <Sidebar isOpen={isOpen} />
      ) : (
        <Sidebar isOpen={isOpen} />
      )}
      <div className="flex flex-col flex-1">
        <Navbar isOpen={isOpen} toggle={toggle} />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-4 overflow-auto">
          {showOutletInstead ? <Outlet /> : <CardGrid />}
        </main>
      </div>
    </div>
  );
}
