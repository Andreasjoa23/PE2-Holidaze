import React from "react";
import { Link } from "react-router-dom";
import { Venue } from "../../types/api";
import { calculateBeds } from "../ui/Beds";
import { getPlaceholderImage } from "../../utils/image/missingImage";

type Props = {
  listings: Venue[];
  onDelete: (id: string) => void;
};

const VenueList: React.FC<Props> = ({ listings, onDelete }) => {
  if (listings.length === 0) {
    return <p className="text-center text-gray-500">You have no venues listed.</p>;
  }

  return (
    <div className="space-y-4">
      {listings.map((venue) => (
        <article
          key={venue.id}
          className="flex bg-gray-100 rounded-lg shadow p-4"
        >
          <img
            src={getPlaceholderImage(venue.media?.[0]?.url, 100, 100)}
            alt={venue.media?.[0]?.alt || venue.name}
            className="w-28 h-28 object-cover rounded mr-4"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-[#0E1E34]">{venue.name}</h3>
            <p className="text-sm text-gray-600">
              {venue.description || "No description"}
            </p>
            <div className="flex gap-4 mt-2 text-sm text-gray-700">
              <span>🛏 {calculateBeds(venue.maxGuests || 1)} beds</span>
              <span>👥 {venue.maxGuests} guests</span>
              <span>
                💰 {venue.price} <span className="text-xs">/night</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-start items-end ml-4 space-y-2">
            <Link
              to={`/venue/${venue.id}`}
              className="text-green-700 hover:text-green-900 transition"
              aria-label={`View venue: ${venue.name}`}
            >
              🔍 View
            </Link>
            <Link
              to={`/profile/edit/${venue.id}`}
              className="text-blue-700 hover:text-blue-900 transition"
              aria-label={`Edit venue: ${venue.name}`}
            >
              ✏️ Edit
            </Link>
            <button
              onClick={() => onDelete(venue.id)}
              className="text-red-600 hover:text-red-800 transition"
              aria-label={`Delete venue: ${venue.name}`}
            >
              🗑 Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default VenueList;
