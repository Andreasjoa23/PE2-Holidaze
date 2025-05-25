import apiClient from "./client";
import { Venue, ApiListResponse, ApiSingleResponse } from "../types/api";

/**
 * Fetches all venues, sorted by creation date.
 * @returns List of venues
 */
export async function getAllVenues(): Promise<ApiListResponse<Venue>> {
  const response = await apiClient.get<ApiListResponse<Venue>>("/holidaze/venues", {
    params: {
      sort: "created",
      sortOrder: "desc",
      _owner: true,
      _bookings: true,
    },
  });

  return response.data;
}

/**
 * Creates a new venue.
 * @param data Venue data
 * @returns Created venue
 */
export async function createVenue(data: Partial<Venue>): Promise<ApiSingleResponse<Venue>> {
  const response = await apiClient.post<ApiSingleResponse<Venue>>("/holidaze/venues", data);
  return response.data;
}

/**
 * Updates an existing venue by ID.
 * @param id Venue ID
 * @param data Updated venue data
 * @returns Updated venue
 */
export async function updateVenue(id: string, data: Partial<Venue>): Promise<ApiSingleResponse<Venue>> {
  const response = await apiClient.put<ApiSingleResponse<Venue>>(`/holidaze/venues/${id}`, data);
  return response.data;
}

/**
 * Deletes a venue by ID.
 * @param venueId Venue ID
 * @returns API response
 */
export async function deleteVenue(venueId: string): Promise<ApiSingleResponse<object>> {
  const response = await apiClient.delete<ApiSingleResponse<object>>(`/holidaze/venues/${venueId}`);
  return response.data;
}

/**
 * Fetches a single venue by ID, including bookings.
 * @param id Venue ID
 * @returns Venue details
 */
export async function getVenueById(id: string): Promise<ApiSingleResponse<Venue>> {
  const response = await apiClient.get<ApiSingleResponse<Venue>>(
    `/holidaze/venues/${id}?_bookings=true`
  );
  return response.data;
}
