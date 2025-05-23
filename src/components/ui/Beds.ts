/**
 * Calculates the estimated number of beds based on the number of guests.
 * Assumes 2 guests can typically share 1 bed.
 *
 * @param guests - The number of guests staying at the venue.
 * @returns The number of beds needed (rounded up).
 */
export function calculateBeds(guests: number): number {
  return Math.ceil(guests / 2);
}
