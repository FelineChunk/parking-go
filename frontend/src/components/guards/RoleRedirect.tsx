import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const RoleRedirect = () => {
  const { session, role, loading } = useAuth();

  // Tunggu sampai loading benar-benar false
  if (loading) {
    return <div>Menghubungkan ke sistem...</div>;
  }

  // Jika tidak ada session setelah loading selesai, balik ke login
  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  // Jika session ada tapi role belum dapet (sangat jarang terjadi sekarang)
  if (!role) {
    return <div>Memvalidasi identitas...</div>;
  }

  // Redirect berdasarkan role
  console.log("Mengarahkan user dengan role:", role);
  if (role === "admin" || "super") return <Navigate to="/admin" replace />;
  if (role === "petugas") return <Navigate to="/petugas" replace />;
  if (role === "owner") return <Navigate to="/owner" replace />;
  
  return <Navigate to="/unauthorized" replace />;
};