import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://linkedin-1-5nsp.onrender.com/"
      : "http://localhost:8000/",
  withCredentials: true,
});
