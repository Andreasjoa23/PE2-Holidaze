import apiClient from "./apiClient";
import { UserProfile, LoginResponse, RegisterPayload, RegisterResponse } from "../types/api";

/**
 * Logs in a user with their email and password.
 * @param credentials User email and password
 * @returns Axios response with authentication data
 */
export const loginUser = (credentials: {
  email: string;
  password: string;
}) => {
  return apiClient.post<{ data: LoginResponse }>("/auth/login?_holidaze=true", credentials);
};

/**
 * Registers a new user.
 * @param payload User registration information
 * @returns The registered user profile
 */
export async function registerUser(payload: RegisterPayload): Promise<UserProfile> {
  const response = await apiClient.post<RegisterResponse>("/auth/register", payload);
  return response.data.data;
}
