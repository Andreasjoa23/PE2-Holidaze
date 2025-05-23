import apiClient from "./apiClient";
import {
  Venue,
  Booking,
  ApiListResponse,
  ApiSingleResponse,
  UserProfile,
} from "../types/api";

interface ProfileUpdatePayload {
  avatar: { url: string; alt: string };
  banner: { url: string; alt: string };
}

/**
 * Updates a user's profile information.
 * @param data Avatar and banner data
 * @returns Updated user profile
 */
export async function updateProfile(
  data: ProfileUpdatePayload
): Promise<ApiSingleResponse<UserProfile>> {
  const user = JSON.parse(localStorage.getItem("user") || "{}") as UserProfile;
  const username = user?.name;

  if (!username) throw new Error("Username not found in localStorage");

  const response = await apiClient.put<ApiSingleResponse<UserProfile>>(
    `/holidaze/profiles/${username}`,
    data
  );
  return response.data;
}

/**
 * Fetches bookings for a user.
 * @param username Username to fetch bookings for
 * @returns List of bookings
 */
export async function fetchUserBookings(
  username: string
): Promise<ApiListResponse<Booking>> {
  const response = await apiClient.get<ApiListResponse<Booking>>(
    `/holidaze/profiles/${username}/bookings?_venue=true&_customer=true`
  );
  return response.data;
}

/**
 * Fetches venues owned by a user.
 * @param name Username
 * @returns List of venues
 */
export async function fetchUserListings(name: string): Promise<Venue[]> {
  const response = await apiClient.get<ApiListResponse<Venue>>(
    `/holidaze/profiles/${name}/venues?_bookings=true&_views=true`
  );
  return response.data.data;
}

/**
 * Fetches favorite venues for a user.
 * @param username Username
 * @returns List of favorite venues
 */
export async function fetchUserFavorites(username: string): Promise<Venue[]> {
  const response = await apiClient.get<ApiListResponse<Venue>>(
    `/holidaze/profiles/${username}/favorites`
  );
  return response.data.data;
}
