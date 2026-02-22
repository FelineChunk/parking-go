import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/common/ScrollToTop";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";

import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";

import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";

import AppLayout from "./layout/AppLayout";

/* ===== ROLE DASHBOARD ===== */
import DashboardPetugas from "./pages/Dashboard/DashboardPetugas";
import DashboardAdmin from "./pages/Dashboard/DashboardAdmin";
import DashboardOwner from "./pages/Dashboard/DashboardOwner";

/* ===== AUTH ===== */
import { ProtectedRoute } from "./components/guards/ProtectedRoute";
import { RoleRedirect } from "./components/guards/RoleRedirect";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* ========================= */}
        {/* Layout Protected Routes   */}
        {/* ========================= */}
        <Route element={<AppLayout />}>

          {/* ✅ ROOT → Auto Redirect Berdasarkan Role */}
          <Route path="/" element={<RoleRedirect />} />

          {/* ✅ PETUGAS */}
          <Route
            path="/petugas"
            element={
              <ProtectedRoute allowedRoles={["petugas", "super"]}>
                <DashboardPetugas />
              </ProtectedRoute>
            }
          />

          {/* ✅ ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin", "super"]}>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />

          {/* ✅ OWNER */}
          <Route
            path="/owner"
            element={
              <ProtectedRoute allowedRoles={["owner", "super"]}>
                <DashboardOwner />
              </ProtectedRoute>
            }
          />

          {/* ========================= */}
          {/* Pages umum                */}
          {/* ========================= */}

          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/form-elements" element={<FormElements />} />
          <Route path="/basic-tables" element={<BasicTables />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />

        </Route>

        {/* ========================= */}
        {/* Public Routes             */}
        {/* ========================= */}

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}