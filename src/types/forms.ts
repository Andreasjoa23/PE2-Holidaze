import { Venue, MetaInfo, Location } from "./api";

export type VenueFormLocation = Pick<Location, "country" | "city" | "address">;

export interface VenueFormData {
  title: string;
  description: string;
  location: VenueFormLocation;
  media: string[];
  price: number;
  maxGuests: number;
  meta: MetaInfo;
}

export interface VenueFormProps {
  mode: "create" | "edit";
  initialData?: Partial<Venue>;
  onSuccess: (id?: string) => void;
  onClose: () => void;
}

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
