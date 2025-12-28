// src/app/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import AuthDashboard from "../components/auth/layout/AuthDashboard";
import WriteShayari from "../components/ui/WriteShayari";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<AuthDashboard />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<DashboardLayout />}>
          <Route path="write" element={<WriteShayari />} />
        </Route>
      </Route>
    </Routes>
  );
}
