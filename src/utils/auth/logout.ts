/**
 * Logs the user out by clearing relevant data from local storage
 * and reloading the page to reset application state.
 */
export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  localStorage.removeItem("holidaze_favorites");
  window.location.reload();
}
