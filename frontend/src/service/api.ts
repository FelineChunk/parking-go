import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getParkings = () => {
  return api.get("/transactions");
};

// 🔥 INTERCEPTOR
// api.ts
api.interceptors.request.use((config) => {
  // Ambil token dari LocalStorage secara manual (jauh lebih aman & cepat)
  const storageKey = "sb-eusjlvebwoybwaptwccf-auth-token"; // Ganti dengan ID projectmu
  const sessionData = localStorage.getItem(storageKey);
  
  if (sessionData) {
    const session = JSON.parse(sessionData);
    const token = session.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});



export default api;
