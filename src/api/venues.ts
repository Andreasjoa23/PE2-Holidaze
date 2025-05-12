// src/api/venues.ts

import apiClient from "./apiClient";

/**
 * Henter alle venues
 */
export async function getAllVenues() {
  const response = await apiClient.get("/holidaze/venues");
  return response.data;
}

/**
 * Oppretter en ny venue
 */
export async function createVenue(data: any) {
  const response = await apiClient.post("/holidaze/venues", data);
  return response.data;
}

/**
 * Oppdaterer eksisterende venue
 */
export async function updateVenue(id: string, data: any) {
  const response = await apiClient.put(`/holidaze/venues/${id}`, data);
  return response.data;
}

/**
 * Sletter en venue
 */
export async function deleteVenue(venueId: string) {
  const response = await apiClient.delete(`/holidaze/venues/${venueId}`);
  return response.data;
}
