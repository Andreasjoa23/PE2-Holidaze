export interface MediaItem {
  url: string;
  alt: string;
}

export interface MetaInfo {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

export interface Person {
  name: string;
  email: string;
  bio: string;
  avatar: MediaItem;
  banner: MediaItem;
}

export interface UserProfile extends Person {
  location?: string;
}

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

export interface BookingSummary {
  id: string;
  dateFrom: string;
  dateTo: string;
  venue?: Venue;
}

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

export interface PaginationMeta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiSingleResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}
