import axios from "axios";
import { supabase } from "../lib/supabase"; // sesuaikan path

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getParkings = () => {
  return api.get("/api/transactions");
};

// 🔥 INTERCEPTOR
api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
