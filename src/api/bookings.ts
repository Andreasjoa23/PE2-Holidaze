import apiClient from "./apiClient";

export const createBooking = (data: {
  dateFrom: string;
  dateTo: string;
  venueId: string;
}) => {
  return apiClient.post("/holidaze/bookings", data);
};
