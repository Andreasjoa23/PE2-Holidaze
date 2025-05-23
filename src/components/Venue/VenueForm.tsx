import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createVenue, updateVenue } from "../../api/venues";
import { calculateBeds } from "../ui/Beds";
import { VenueFormProps, VenueFormData } from "../../types/forms";

/**
 * Form component for creating or editing a venue listing.
 * Supports dynamic media, validation, and submission handling.
 *
 * @component
 * @param {VenueFormProps} props - Component props
 */
const VenueForm: React.FC<VenueFormProps> = ({
  mode,
  initialData,
  onSuccess,
  onClose,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<VenueFormData>({
    title: initialData?.name || "",
    description: initialData?.description || "",
    location: {
      country: initialData?.location?.country || "",
      city: initialData?.location?.city || "",
      address: initialData?.location?.address || "",
    },
    media: initialData?.media?.map((m) => m.url) || [""],
    price: initialData?.price || 0,
    maxGuests: initialData?.maxGuests || 1,
    meta: initialData?.meta || {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  const [error, setError] = useState("");
  const [newVenueId, setNewVenueId] = useState<string | null>(null);

  /**
   * Handles input field updates for both top-level and nested location fields.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      const key = name.split(".")[1] as keyof VenueFormData["location"];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /**
   * Toggles boolean checkbox values for venue facilities (meta).
   */
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      meta: { ...prev.meta, [name]: checked },
    }));
  };

  /**
   * Adds a new blank media input field.
   */
  const handleAddImage = () => {
    setFormData((prev) => ({ ...prev, media: [...prev.media, ""] }));
  };

  /**
   * Updates a specific image URL by index.
   */
  const handleMediaChange = (index: number, value: string) => {
    const updatedMedia = [...formData.media];
    updatedMedia[index] = value;
    setFormData((prev) => ({ ...prev, media: updatedMedia }));
  };

  /**
   * Validates user input and returns an error message if invalid.
   */
  const validateForm = () => {
    if (formData.price < 0) return "Price must be zero or positive.";
    if (formData.maxGuests < 1) return "At least 1 guest must be allowed.";
    if (!formData.media.some((url) => url.trim() !== "")) {
      return "Please provide at least one image URL.";
    }
    return "";
  };

  /**
   * Handles form submission: creates or updates venue based on mode.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      name: formData.title,
      description: formData.description,
      media: formData.media
        .filter((url) => url.trim() !== "")
        .map((url) => ({ url, alt: `${formData.title} image` })),
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      meta: formData.meta,
      location: {
        address: formData.location.address,
        city: formData.location.city,
        country: formData.location.country,
        zip: "",
        continent: "",
        lat: 0,
        lng: 0,
      },
    };

    try {
      if (mode === "create") {
        const response = await createVenue(payload);
        setNewVenueId(response.data.id);
      } else if (mode === "edit" && initialData?.id) {
        await updateVenue(initialData.id, payload);
        onSuccess(initialData.id);
      }
    } catch (err) {
      console.error(err);
      setError(`Failed to ${mode} venue. Please check your inputs.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        className="bg-white max-w-lg w-full p-6 rounded-2xl shadow-xl relative overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          aria-label="Close form"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        {newVenueId ? (
          <div className="text-center space-y-6">
            <h3 className="text-xl font-semibold text-green-700">
              Venue created successfully!
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  onClose();
                  window.location.reload();
                }}
                className="px-4 py-2 border rounded text-sm"
              >
                Great, thanks!
              </button>
              <button
                onClick={() => navigate(`/venue/${newVenueId}`)}
                className="px-4 py-2 bg-blue-900 text-white rounded text-sm"
              >
                View Venue Page
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold">
              {mode === "create" ? "Create listing" : "Edit listing"}
            </h3>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              rows={4}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="location.country"
                placeholder="Country"
                value={formData.location.country}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
              <input
                name="location.city"
                placeholder="City"
                value={formData.location.city}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
            </div>
            <input
              name="location.address"
              placeholder="Street address"
              value={formData.location.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1">Max guests</label>
                <input
                  type="number"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleChange}
                  min={1}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Beds (auto)</label>
                <input
                  type="text"
                  disabled
                  value={calculateBeds(formData.maxGuests)}
                  className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500"
                />
              </div>
            </div>

            <input
              type="url"
              placeholder="Cover image URL"
              value={formData.media[0]}
              onChange={(e) => handleMediaChange(0, e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />

            {formData.media.slice(1).map((url, i) => (
              <input
                key={i + 1}
                type="url"
                placeholder={`Image URL ${i + 2}`}
                value={url}
                onChange={(e) => handleMediaChange(i + 1, e.target.value)}
                className="w-full border px-3 py-2 rounded mt-2"
              />
            ))}

            <button
              type="button"
              onClick={handleAddImage}
              className="text-sm text-blue-700 hover:underline"
            >
              ➕ Add more images
            </button>

            <label className="text-sm font-medium block">Price per night (USD)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min={0}
              className="w-full border px-3 py-2 rounded"
            />

            <fieldset>
              <legend className="font-medium mb-2">Facilities</legend>
              <div className="flex flex-wrap gap-3">
                {Object.entries(formData.meta).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name={key}
                      checked={value}
                      onChange={handleCheckbox}
                    />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                ))}
              </div>
            </fieldset>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-900 text-white rounded"
              >
                {mode === "create" ? "Post" : "Save"}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default VenueForm;
