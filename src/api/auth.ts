import apiClient from "./apiClient";

export const loginUser = (credentials: {
  email: string;
  password: string;
}) => {
  return apiClient.post("/auth/login", credentials);
};



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
