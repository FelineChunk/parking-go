import api from "./api";

export const getParkings = () => {
  return api.get("/api/data");
};
