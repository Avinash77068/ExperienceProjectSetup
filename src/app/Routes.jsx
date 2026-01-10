// src/app/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import AuthDashboard from "../components/auth/layout/AuthDashboard";
import ShayariDetail from "../components/ui/ShayriDetails";
import WriteShayari from "../components/ui/WriteShayari";
import Explore from "../components/ui/Explore";
import Categories from "../components/ui/Categories";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<AuthDashboard />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<DashboardLayout />}>
          <Route path="shayari/:id" element={<ShayariDetail />} />
          <Route path="write" element={<WriteShayari />} />
          <Route path="explore" element={<Explore />} />
          <Route path="categories" element={<Categories />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Route>
    </Routes>
  );
}
