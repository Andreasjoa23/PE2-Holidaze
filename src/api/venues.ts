import apiClient from "./apiClient";
import { Venue, ApiListResponse, ApiSingleResponse } from "../types/api";

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

export async function createVenue(data: Partial<Venue>): Promise<ApiSingleResponse<Venue>> {
  const response = await apiClient.post<ApiSingleResponse<Venue>>("/holidaze/venues", data);
  return response.data;
}

export async function updateVenue(id: string, data: Partial<Venue>): Promise<ApiSingleResponse<Venue>> {
  const response = await apiClient.put<ApiSingleResponse<Venue>>(`/holidaze/venues/${id}`, data);
  return response.data;
}

export async function deleteVenue(venueId: string): Promise<ApiSingleResponse<object>> {
  const response = await apiClient.delete<ApiSingleResponse<object>>(`/holidaze/venues/${venueId}`);
  return response.data;
}

export async function getVenueById(id: string): Promise<ApiSingleResponse<Venue>> {
  const response = await apiClient.get<ApiSingleResponse<Venue>>(
    `/holidaze/venues/${id}?_bookings=true`
  );
  return response.data;
}
