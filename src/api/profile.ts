import apiClient from "./apiClient";

export async function updateProfile(data: {
  avatar: { url: string; alt: string };
  banner: { url: string; alt: string };
}) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user?.name;

  if (!username) throw new Error("Username not found in localStorage");

  const response = await apiClient.put(`/holidaze/profiles/${username}`, data);
  return response.data;
}

export async function fetchUserBookings(username: string) {
  const response = await apiClient.get(`/holidaze/profiles/${username}/bookings`);
  return response.data;
}

export async function fetchUserListings(username: string) {
  const response = await apiClient.get(`/holidaze/profiles/${username}/venues`);
  return response.data;
}

export async function fetchUserFavorites(username: string) {
  const response = await apiClient.get(`/holidaze/profiles/${username}/favorites`);
  return response.data;
}
