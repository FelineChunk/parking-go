import axios from "axios";
import { supabase } from "../lib/supabase"; // sesuaikan path

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// 🔥 INTERCEPTOR
api.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});

export default api;
