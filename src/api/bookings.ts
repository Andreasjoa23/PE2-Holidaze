import apiClient from "./apiClient";

export const createBooking = (data: {
  dateFrom: string;
  dateTo: string;
  venueId: string;
  guests: number;
}) => {
  return apiClient.post("/holidaze/bookings", data);
};
