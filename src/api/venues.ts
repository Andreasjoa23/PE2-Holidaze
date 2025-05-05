import apiClient from "./apiClient";

export async function getAllVenues() {
  const response = await apiClient.get("/holidaze/venues");
  return response.data;
}

export async function createVenue(data: any) {
  const response = await apiClient.post("/holidaze/venues", data);
  return response.data;
}