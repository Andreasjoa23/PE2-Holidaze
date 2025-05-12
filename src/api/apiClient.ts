import axios from "axios";

const API_KEY = "d7ec1edc-cb98-49aa-9f93-4587f665659d";

const apiClient = axios.create({
  baseURL: "https://v2.api.noroff.dev",
  headers: {
    "X-Noroff-API-Key": API_KEY,
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;