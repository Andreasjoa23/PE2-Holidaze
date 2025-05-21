import apiClient from "./apiClient";
import { UserProfile } from "../types/api";

export const loginUser = (credentials: {
  email: string;
  password: string;
}) => {
  return apiClient.post("/auth/login", credentials);
};

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: { url: string; alt: string };
  banner?: { url: string; alt: string };
  venueManager?: boolean;
}

interface RegisterResponse {
  data: UserProfile;
}

export async function registerUser(payload: RegisterPayload): Promise<UserProfile> {
  const response = await apiClient.post<RegisterResponse>("/auth/register", payload);
  return response.data.data;
}