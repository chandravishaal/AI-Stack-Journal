import axios from "axios";

//Create a reusable axios instance
const api = axios.create({
  baseURL: "https://ai-stack-journal-backend.onrender.com/api", 
  timeout: 10000,  
  headers: {
    "Content-Type": "application/json",
  },
});

//Request interceptor (add auth tokens, logging, etc.)
api.interceptors.request.use(
  (config) => {
    // Example: add auth token if needed
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

//Response interceptor (handle errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;