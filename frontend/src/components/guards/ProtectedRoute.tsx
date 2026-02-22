import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const { session, role, loading } = useAuth();

  // 1. Tampilkan loading jika data masih di-fetch
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Memverifikasi Akses...</p>
      </div>
    );
  }

  // 2. Jika tidak ada session, tendang ke login
  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  // 3. Jika session ada tapi role tidak sesuai
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};