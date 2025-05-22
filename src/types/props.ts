import { UserProfile, Venue } from "./api";

export interface FooterProps {
  isLoggedIn: boolean;
}

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

export interface AuthDropdownProps {
  onClose: () => void;
}

export interface UserDropdownProps {
  onClose: () => void;
}

export interface RegisterFormProps {
  switchToLogin?: () => void;
  setPrefillEmail?: (email: string) => void;
}

export interface LoginFormProps {
  onSuccess?: (user: UserProfile) => void;
  prefillEmail?: string;
}

export interface HeaderListingsProps {
  listings: Partial<Venue>[];
  onBack: () => void;
  onDelete: (id: string) => void;
  onEdit: (venue: Partial<Venue>) => void;
  onRefresh: () => void;
}

export interface HeaderBookingsProps {
  bookings: SimpleBooking[];
  onBack: () => void;
  onRefresh: () => void;
}

export interface ListingsDropdownProps {
  listings: Venue[];
  onDelete: (id: string) => void;
  onUpdate: () => void;
}

export interface SimpleBooking {
  id: string;
  venue?: MinimalVenue;
  dateFrom: string;
  dateTo: string;
}

export interface Recommendation {
  id: number;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  comment: string;
}

export interface EditVenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Venue;
  onSuccess: () => void;
}

export interface VenueListProps {
  venues: Venue[];
  onEdit: (venue: Venue) => void;
  onClose: () => void;
  onDeleted: () => void;
}

export interface InsightsProps {
  bookingsCount: number;
  viewsCount: number;
  income: number;
  nextBooking?: string;
}

export interface MinimalVenue {
  id: string;
  name: string;
  description: string;
  media?: { url: string }[];
  price: number;
  maxGuests: number;
}

export interface TrendingSlideProps {
  venue: MinimalVenue;
}
