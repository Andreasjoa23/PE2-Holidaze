const FAVORITES_KEY = "holidaze_favorites";

export function getFavoriteVenueIds(): string[] {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function toggleFavoriteVenue(id: string): string[] {
  const current = getFavoriteVenueIds();
  const updated = current.includes(id)
    ? current.filter((vid) => vid !== id)
    : [...current, id];

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

export function isFavorite(id: string): boolean {
  return getFavoriteVenueIds().includes(id);
}
