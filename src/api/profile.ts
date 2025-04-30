import apiClient from "./apiClient";

export async function updateUserProfile(username: string, profileData: {
  name?: string;
  email?: string;
  bio?: string;
  avatar?: { url: string; alt?: string };
  banner?: { url: string; alt?: string };
}) {
  const response = await apiClient.put(`/holidaze/profiles/${username}`, profileData);
  return response.data;
}
