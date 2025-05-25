/**
 * Checks whether a user is currently logged in based on local storage.
 *
 * @returns `true` if a user token exists in local storage, otherwise `false`.
 */
export function isLoggedIn(): boolean {
  return !!localStorage.getItem("user");
}
