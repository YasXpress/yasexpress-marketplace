import axios from "axios";

const API = "http://localhost:5000";
//import.meta.env.VITE_API_URL;
// ================= AXIOS INSTANCE =================
const api = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;