/* import apiClient from "./apiClient";

export async function getAllVenues() {
  const response = await apiClient.get("/holidaze/venues");
  return response.data;
}
 */




/* import apiClient from "./apiClient";

export async function getAllVenues() {
  const response = await apiClient.get("/holidaze/venues");
  return response.data.data; // <-- viktig: hent ut kun venues-array
} */



  import apiClient from "./apiClient";

export async function getAllVenues() {
  const response = await apiClient.get("/holidaze/venues");
  return response.data; // Returner hele objektet
}