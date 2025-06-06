import { Venue, MetaInfo, Location } from "./api";

/**
 * Represents a subset of location data used in venue forms.
 */
export type VenueFormLocation = Pick<Location, "country" | "city" | "address">;

/**
 * Defines the structure of data required to create or edit a venue via form inputs.
 */
export interface VenueFormData {
  title: string;
  description: string;
  location: VenueFormLocation;
  media: string[];
  price: number;
  maxGuests: number;
  meta: MetaInfo;
}

/**
 * Props for the venue form component, supporting both create and edit modes.
 */
export interface VenueFormProps {
  mode: "create" | "edit";
  initialData?: Partial<Venue>;
  onSuccess: (id?: string) => void; 
  onClose: () => void; 
}

/**
 * Payload structure expected by the backend API when submitting a venue.
 */
export interface VenuePayload {
  name: string;
  description: string;
  media: { url: string; alt: string }[];
  price: number;
  maxGuests: number;
  meta: MetaInfo;
  location: {
    address: string;
    city: string;
    country: string;
    zip: string;
    continent: string;
    lat: number;
    lng: number;
  };
}
