import apiClient from "./apiClient";
import { Booking, ApiSingleResponse } from "../types/api";

/**
 * Creates a new booking.
 * @param data Booking details
 * @returns The newly created booking
 */
export const createBooking = (data: {
  dateFrom: string;
  dateTo: string;
  venueId: string;
  guests: number;
}) => {
  return apiClient.post<ApiSingleResponse<Booking>>("/holidaze/bookings", data);
};

/**
 * Deletes a booking by ID.
 * @param id Booking ID
 * @returns Axios response
 */
export const deleteBooking = (id: string) => {
  return apiClient.delete(`/holidaze/bookings/${id}`);
};
