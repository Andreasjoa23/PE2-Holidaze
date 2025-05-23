/**
 * Represents a media item, such as an image or video, with a URL and alt text.
 */
export interface MediaItem {
  url: string;
  alt: string;
}

/**
 * Contains boolean flags indicating which amenities are available at a venue.
 */
export interface MetaInfo {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

/**
 * Represents a detailed physical location, including coordinates.
 */
export interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

/**
 * Describes a person with basic contact details and profile media.
 */
export interface Person {
  name: string;
  email: string;
  bio: string;
  avatar: MediaItem;
  banner: MediaItem;
}

/**
 * Extends a person with additional user profile information, including role.
 */
export interface UserProfile extends Person {
  location?: string;
  venueManager: boolean;
}

/**
 * Describes a venue that can be booked, including details, media, and metadata.
 */
export interface Venue {
  id: string;
  name: string;
  description: string;
  media: MediaItem[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: MetaInfo;
  location: Location;
  owner?: Person;
  bookings?: Booking[];
  views?: number;
}

/**
 * A brief summary of a booking with optional venue information.
 */
export interface BookingSummary {
  id: string;
  dateFrom: string;
  dateTo: string;
  venue?: Venue;
}

/**
 * Represents a full booking, including venue and customer information.
 */
export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue: Venue;
  customer: Person;
}

/**
 * Metadata used for paginated API responses.
 */
export interface PaginationMeta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
}

/**
 * Generic format for an API response returning a list of items with pagination.
 */
export interface ApiListResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Generic format for an API response returning a single item.
 */
export interface ApiSingleResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

/**
 * Response returned after a successful login, includes user profile and token.
 */
export interface LoginResponse extends UserProfile {
  accessToken: string;
}
