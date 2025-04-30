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
