import apiClient from "./apiClient";

export async function getAllVenues() {
  const response = await apiClient.get("/holidaze/venues", {
    params: {
      sort: "created",
      sortOrder: "desc",
      _owner: true,
      _bookings: true,
    },
  });
  return response.data;
}

export async function createVenue(data: any) {
  const response = await apiClient.post("/holidaze/venues", data);
  return response.data;
}

export async function updateVenue(id: string, data: any) {
  const response = await apiClient.put(`/holidaze/venues/${id}`, data);
  return response.data;
}

export async function deleteVenue(venueId: string) {
  const response = await apiClient.delete(`/holidaze/venues/${venueId}`);
  return response.data;
}

export async function getVenueById(id: string) {
  const response = await apiClient.get(`/holidaze/venues/${id}?_bookings=true`);
  return response.data;
}
