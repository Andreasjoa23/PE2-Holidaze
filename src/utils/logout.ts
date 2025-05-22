export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  localStorage.removeItem("holidaze_favorites");
  window.location.reload();
}
