import apiClient from "./apiClient";

export async function getAllVenues() {
  const response = await apiClient.get("/holidaze/venues");
  return response.data;
}

export async function createVenue(data: any) {
  const response = await apiClient.post("/holidaze/venues", data);
  return response.data;
}

export async function updateVenue(id: string, data: any) {
  return await apiClient.put(`/holidaze/venues/${id}`, data);
}

export async function deleteVenue(venueId: string) {
  try {
    const response = await apiClient.delete(`/holidaze/venues/${venueId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete venue ${venueId}:`, error);
    throw error;
  }
}