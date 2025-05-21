import apiClient from "./apiClient";
import { Booking } from "../types/api";
import { ApiSingleResponse } from "../types/api";

export const createBooking = (data: {
  dateFrom: string;
  dateTo: string;
  venueId: string;
  guests: number;
}) => {
  return apiClient.post<ApiSingleResponse<Booking>>("/holidaze/bookings", data);
};

export const deleteBooking = (id: string) => {
  return apiClient.delete(`/holidaze/bookings/${id}`);
};
