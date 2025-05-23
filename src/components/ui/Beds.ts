export function calculateBeds(guests: number): number {
  return Math.ceil(guests / 2);
}