import apiClient from "./apiClient";

export async function loginUser(credentials: { email: string; password: string }) {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
}


export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: { url: string; alt: string };
  banner?: { url: string; alt: string };
  venueManager?: boolean;
}) {
  const response = await apiClient.post("/auth/register", data);
  return response.data;
}
