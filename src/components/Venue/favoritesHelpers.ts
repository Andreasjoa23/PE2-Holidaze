const FAVORITES_KEY = "holidaze_favorites";

/**
 * Retrieves an array of favorite venue IDs from localStorage.
 *
 * @returns An array of venue IDs (strings) the user has marked as favorites.
 */
export function getFavoriteVenueIds(): string[] {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Toggles the favorite status of a venue.
 * Adds the venue ID to favorites if not present, or removes it if already present.
 *
 * @param id - The venue ID to toggle.
 * @returns The updated array of favorite venue IDs.
 */
export function toggleFavoriteVenue(id: string): string[] {
  const current = getFavoriteVenueIds();
  const updated = current.includes(id)
    ? current.filter((vid) => vid !== id)
    : [...current, id];

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Checks whether a specific venue is marked as a favorite.
 *
 * @param id - The venue ID to check.
 * @returns `true` if the venue is a favorite, `false` otherwise.
 */
export function isFavorite(id: string): boolean {
  return getFavoriteVenueIds().includes(id);
}
