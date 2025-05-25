import { Venue } from "./api";

/**
 * Props for the Footer component, indicates login state.
 */
export interface FooterProps {
  isLoggedIn: boolean;
}

/**
 * Props for displaying a venue card.
 */
export interface VenueCardProps {
  id: string;
  name: string;
  description: string;
  media: { url: string }[];
  price: number;
  maxGuests: number;
  location?: { city?: string; country?: string };
  onFavoriteToggle?: () => void;
}

/**
 * Props for the authentication dropdown component.
 */
export interface AuthDropdownProps {
  onClose: () => void;
}

/**
 * Props for the user menu dropdown component.
 */
export interface UserDropdownProps {
  onClose: () => void;
}

/**
 * Props for the registration form.
 */
export interface RegisterFormProps {
  switchToLogin?: () => void;
  setPrefillEmail?: (email: string) => void;
}

/**
 * Props for the login form.
 */
export interface LoginFormProps {
  prefillEmail?: string;
}

/**
 * Props for the header section managing venue listings.
 */
export interface HeaderListingsProps {
  listings: Partial<Venue>[];
  onBack: () => void;
  onDelete: (id: string) => void;
  onEdit: (venue: Partial<Venue>) => void;
  onRefresh: () => void;
}

/**
 * Props for the header section managing bookings.
 */
export interface HeaderBookingsProps {
  bookings: SimpleBooking[];
  onBack: () => void;
  onRefresh: () => void;
}

/**
 * Props for a dropdown displaying venue listings.
 */
export interface ListingsDropdownProps {
  listings: Venue[];
  onDelete: (id: string) => void;
  onUpdate: () => void;
  onCreate?: () => void;
}

/**
 * A simplified booking model for compact displays.
 */
export interface SimpleBooking {
  id: string;
  venue?: MinimalVenue;
  dateFrom: string;
  dateTo: string;
}

/**
 * Represents a user recommendation or review.
 */
export interface Recommendation {
  id: number;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  comment: string;
}

/**
 * Props for a modal used to edit a venue.
 */
export interface EditVenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Venue;
  onSuccess: () => void;
}

/**
 * Props for listing multiple venues with editing and deletion.
 */
export interface VenueListProps {
  venues: Venue[];
  onEdit: (venue: Venue) => void;
  onClose: () => void;
  onDeleted: () => void;
}

/**
 * Props for an insights dashboard showing stats.
 */
export interface InsightsProps {
  bookingsCount: number;
  viewsCount: number;
  income: number;
  nextBooking?: string;
}

/**
 * A minimal venue model used for previews or summaries.
 */
export interface MinimalVenue {
  id: string;
  name: string;
  description: string;
  media?: { url: string }[];
  price: number;
  maxGuests: number;
}

/**
 * Props for a trending venue slide component.
 */
export interface TrendingSlideProps {
  venue: MinimalVenue;
}
