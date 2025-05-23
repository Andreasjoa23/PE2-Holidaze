import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createVenue, updateVenue } from "../../api/venues";
import { VenueFormProps, VenueFormData } from "../../types/forms";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      const key = name.split(".")[1] as keyof VenueFormData["location"];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [key]: value,
        },
      }));
    } else {
      const key = name as keyof Omit<VenueFormData, "location" | "meta" | "media">;
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      meta: { ...prev.meta, [name]: checked },
    }));
  };

  const handleAddImage = () => {
    setFormData((prev) => ({ ...prev, media: [...prev.media, ""] }));
  };

  const handleMediaChange = (index: number, value: string) => {
    const updatedMedia = [...formData.media];
    updatedMedia[index] = value;
    setFormData((prev) => ({ ...prev, media: updatedMedia }));
  };

  const validateForm = () => {
    if (formData.price < 0) return "Price must be zero or positive.";
    if (formData.maxGuests < 1) return "At least 1 guest must be allowed.";
    if (!formData.media.some((url) => url.trim() !== "")) {
      return "Please provide at least one image URL.";
    }
    return "";
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white max-w-lg w-full p-6 rounded-2xl shadow-xl relative overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
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
                onClick={onClose}
                className="px-4 py-2 border rounded text-sm"
              >
                Great, thanks!
              </button>
              {newVenueId && (
                <button
                  onClick={() => navigate(`/venue/${newVenueId}`)}
                  className="px-4 py-2 bg-blue-900 text-white rounded text-sm"
                >
                  View Venue Page
                </button>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold">
              {mode === "create" ? "Create" : "Edit"} Listing
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
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="location.country"
                placeholder="Country"
                value={formData.location.country}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="location.city"
                placeholder="City"
                value={formData.location.city}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="location.address"
                placeholder="Address"
                value={formData.location.address}
                onChange={handleChange}
                className="col-span-2 w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="maxGuests"
                placeholder="Number of guests"
                value={formData.maxGuests}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                min={1}
              />
              <input
                type="number"
                name="price"
                placeholder="Price per night"
                value={formData.price}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                min={0}
              />
            </div>

            {formData.media.map((url, i) => (
              <input
                key={i}
                type="url"
                placeholder={`Image URL ${i + 1}`}
                value={url}
                onChange={(e) => handleMediaChange(i, e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            ))}

            <button
              type="button"
              onClick={handleAddImage}
              className="text-sm text-blue-700 hover:underline"
            >
              ➕ Add more images
            </button>

            <fieldset className="mt-4">
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
                    {key}
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