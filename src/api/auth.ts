import apiClient from "./apiClient";
import { UserProfile } from "../types/api";

/**
 * Logs in a user with their email and password.
 * @param credentials User email and password
 * @returns Axios response with authentication data
 */
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

/**
 * Registers a new user.
 * @param payload User registration information
 * @returns The registered user profile
 */
export async function registerUser(payload: RegisterPayload): Promise<UserProfile> {
  const response = await apiClient.post<RegisterResponse>("/auth/register", payload);
  return response.data.data;
}
