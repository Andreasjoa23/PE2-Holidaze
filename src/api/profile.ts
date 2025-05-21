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

export async function fetchUserBookings(
  username: string
): Promise<ApiListResponse<Booking>> {
  const response = await apiClient.get<ApiListResponse<Booking>>(
    `/holidaze/profiles/${username}/bookings?_venue=true&_customer=true`
  );
  return response.data;
}

export async function fetchUserListings(name: string): Promise<Venue[]> {
  const response = await apiClient.get<ApiListResponse<Venue>>(
    `/holidaze/profiles/${name}/venues?_bookings=true&_views=true`
  );
  return response.data.data;
}

export async function fetchUserFavorites(username: string): Promise<Venue[]> {
  const response = await apiClient.get<ApiListResponse<Venue>>(
    `/holidaze/profiles/${username}/favorites`
  );
  return response.data.data;
}
