import React, { useEffect, useState } from "react";
import { updateVenue } from "../../api/venues";
import { X } from "lucide-react";
import { Venue, MediaItem } from "../../types/api";

const amenitiesList = ["wifi", "parking", "breakfast", "pets"] as const;

interface EditVenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Venue;
  onSuccess: () => void;
}

const EditVenueModal: React.FC<EditVenueModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: {
      country: "",
      city: "",
      address: "",
    },
    media: [""],
    price: 0,
    maxGuests: 1,
    beds: 1,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        location: {
          country: initialData.location?.country || "",
          city: initialData.location?.city || "",
          address: initialData.location?.address || "",
        },
        media: initialData.media?.map((m: MediaItem) => m.url) || [""],
        price: initialData.price || 0,
        maxGuests: initialData.maxGuests || 1,
        beds: Math.floor(initialData.maxGuests / 2) || 1,
        meta: initialData.meta || {
          wifi: false,
          parking: false,
          breakfast: false,
          pets: false,
        },
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, key] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as Record<string, string>),
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      meta: { ...prev.meta, [name]: checked },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const payload = {
      name: formData.name,
      description: formData.description,
      media: formData.media
        .filter((url) => url.trim() !== "")
        .map((url) => ({ url, alt: `${formData.name} image` })),
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      meta: formData.meta,
      location: {
        address: formData.location.address || "",
        city: formData.location.city || "",
        country: formData.location.country || "",
        zip: "",
        continent: "",
        lat: 0,
        lng: 0,
      },
    };

    try {
      await updateVenue(initialData.id, payload);
      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Failed to update venue.");
    }
  };

  if (!isOpen || !initialData) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Listing</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Title"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={4}
            placeholder="Description"
            required
          />

          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              name="location.country"
              value={formData.location.country}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Country"
            />
            <input
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="City"
            />
            <input
              type="text"
              name="location.address"
              value={formData.location.address}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              placeholder="Street"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="maxGuests"
              value={formData.maxGuests}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              min={1}
            />
            <input
              type="number"
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              min={1}
            />
          </div>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min={0}
            placeholder="Price per night"
          />

          <fieldset className="mt-4">
            <legend className="font-medium mb-2">Facilities</legend>
            <div className="flex flex-wrap gap-3">
              {amenitiesList.map((key) => (
                <label key={key} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name={key}
                    checked={formData.meta[key as keyof typeof formData.meta]}
                    onChange={handleCheckbox}
                  />
                  <span className="capitalize">{key}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#0E1E34] text-white py-2 px-6 rounded hover:bg-[#182944]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVenueModal;
